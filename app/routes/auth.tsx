export const meta =()=>{[
    {title:'ResumeX- Login'},
    {name:'description', content:'Login to your ResumeX account'}

]}

const auth = () => {
  return (
    <main  className="bg-[url('images/bg-auth.svg')] flex items-center justify-center min-h-screen bg-cover">
        <div className="gradient-border shadow-lg">
            <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                <div>
                <h1>
                    Welcome
                </h1>
                <h2>Log In to continue Your Job Journey</h2>
                </div>
                
            </section>
        </div>
    </main>
  )
}

export default auth