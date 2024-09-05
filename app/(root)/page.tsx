import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName : "Bernardo", lastName: "de la Sierra", email: "bdelasierrar@gmail.com"}
  return (
    <section className="home">
        <div className="home-content">
            <header className='home-header'>
                <HeaderBox 
                    type="greeting"
                    title="Bienvenido"
                    user={ loggedIn?.firstName || 'Invitado'}
                    subtext="Accede y maneja tu cuenta con transaciones eficaces."
                />

                <TotalBalanceBox 
                  accounts={[]}
                  totalBanks={3}
                  totalCurrentBalance={1250.35}
                />
            </header>
            
        </div>
        Transitions
            <RightSidebar 
                user={loggedIn}
                transactions={[]}
                banks={[{currentBalance: '123.50'},{currentBalance: '200.50'}]}
              />
    </section>
  )
}

export default Home