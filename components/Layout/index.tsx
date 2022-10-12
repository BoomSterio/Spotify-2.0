import { Content } from './components/Content'
import { Sidebar } from './components/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen overflow-hidden bg-dark'>
      <main className='flex'>
        <Sidebar />
        <Content>{children}</Content>
      </main>

      {/* <section>Player</section> */}
    </div>
  )
}
