import '@styles/globals.css'

export const metadata = {
    title: "Medi Link",
    description: "Book appointments, ambulance services, and more with ease."
}

const Root = ({children}) => {
  return (
    <html lang="en">
        <body>
            <main className='app'>
                {children}
            </main>
        </body>
    </html>
  )
}

export default Root