import Footer from './tools/Footer'
import NavBar from './tools/NavBar'




const AgentsHome = () => {



  return (

    <>
      <section className='homepage-wrapper'>
        <section className='agents-home'>
          <NavBar />
          <section className='agent-top-section'>
            <h3>Wittle sales companion. Loved by estate agents.</h3>
            <h1>Impress your customers and supercharge your property sales</h1>
            <h5>In one click, get access to all the information you need to deliver exceptional value to your customers and increase your sales.</h5>
            <button className='agent-access'>Get early access for free</button>
          </section>
          <section className='agent-image-section'>
            <div className='agent-portal-image' id='agent1'></div>
            <div className='agent-portal-image' id='agent2'></div>
            <div className='agent-portal-image' id='agent3'></div>
          </section>
          <section className='agent-detail-section'>
            <div className='agent-summary'>
              <h3>In seconds, get access to 20,000 data points which are converted to usable insights, giving you what you need for quality sales conversations that help you stand out from the crowd.</h3>
            </div>
            <div className='agent-summary-stats'>
              <div className='summary-row' id='row1'>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon1'></div>
                  <h3>Summarise properties</h3>
                  <p>Get a summary of everything there is to know about a property across 20+ variables.</p>
                </div>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon2'></div>
                  <h3>Get detailed insights</h3>
                  <p>Drill down into each variable to understand more.</p>
                </div>
              </div>
              <div className='summary-row' id='row2'>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon3'></div>
                  <h3>Compare performance</h3>
                  <p>See how the property or local area compares to other properties and areas in London.</p>
                </div>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon4'></div>
                  <h3>Customise views</h3>
                  <p>Create customised summaries of properties based on the things your clients care about the most.</p>
                </div>
              </div>
              <div className='summary-row' id='row3'>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon5'></div>
                  <h3>Enable better conversations</h3>
                  <p>Unlock the ability for every agent to have a high quality conversation with every potential customer.</p>
                </div>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon6'></div>
                  <h3>Generate efficiencies</h3>
                  <p>Spend less time researching and more time having effective conversations.</p>
                </div>
              </div>

            </div>
          </section>
          <section className='agent-bottom'>
            <button className='agent-access'>Get early access for free</button>

          </section>
          <Footer 
            textColour={'#051885'}
          />
        </section>
      </section>

    </>
  )
}

export default AgentsHome