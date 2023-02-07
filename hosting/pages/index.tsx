import Link from 'next/link'
import App from './_app'

export default function IndexPage() {
  return (
    <>
     
      <div>
        <App/>
      </div>
      <div>
        Hello World. <Link href="/about">About</Link>
      </div>
    </>
  )
}
