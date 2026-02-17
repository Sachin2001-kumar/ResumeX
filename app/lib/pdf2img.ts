export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;

async function loadPdfJs() {
  // 🚨 Prevent SSR crash (React Router SSR)
  if (typeof window === "undefined") return null;

  if (pdfjsLib) return pdfjsLib;

  const lib = await import("pdfjs-dist/build/pdf.mjs");
  const worker = await import(
    "pdfjs-dist/build/pdf.worker.mjs?worker"
  );

  lib.GlobalWorkerOptions.workerPort = new worker.default();

  pdfjsLib = lib;
  return lib;
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    if (typeof window === "undefined") {
      return {
        imageUrl: "",
        file: null,
        error: "PDF conversion must run in browser",
      };
    }

    const lib = await loadPdfJs();
    if (!lib) throw new Error("Failed to load PDF.js");

    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are supported");
    }

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 3 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvas,
      viewport,
    }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
            return;
          }

          const imageFile = new File(
            [blob],
            file.name.replace(/\.pdf$/i, ".png"),
            { type: "image/png" }
          );

          resolve({
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
          });
        },
        "image/png",
        1
      );
    });
  } catch (error: any) {
    console.error("PDF conversion error:", error);

    return {
      imageUrl: "",
      file: null,
      error: error?.message || "Unknown conversion error",
    };
  }
}
