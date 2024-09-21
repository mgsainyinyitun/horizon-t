import HeaderBox from '@/components/HeaderBox';
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react'

const Home = async() => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect('/sign-in');

  return (
    <section className='home'>
      <div className='home-content'>
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access & mgmt of your account and transactions"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={125000.35}
          />
        </header>
      </div>
      <RightSideBar
        user = {loggedIn}
        transactions = {[]}
        banks = {[{currentBalance:1223},{currentBalance:3939.5}]}
      />
    </section>
  )
}

export default Home;