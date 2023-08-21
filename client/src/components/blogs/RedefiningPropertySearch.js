import NavBar from '../tools/NavBar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmail } from 'validator'
import ReactGA from 'react-ga'
import WaitlistSignup from '../helpers/modals/WaitlistSignup'
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, BarChart, Bar, Line, LineChart, ComposedChart, ResponsiveContainer } from 'recharts'




const RedefiningPropertySearch = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const data = [
    { Year: '2005', Turnover: 18.2, Margin: 48 },
    { Year: '2006', Turnover: 33.6, Margin: 53 },
    { Year: '2007', Turnover: 56.7, Margin: 54 },
    { Year: '2008', Turnover: 74, Margin: 55 },
    { Year: '2009', Turnover: 69.4, Margin: 60 },
    { Year: '2010', Turnover: 81.6, Margin: 69 },
    { Year: '2011', Turnover: 97, Margin: 72 },
    { Year: '2012', Turnover: 119.4, Margin: 73 },
    { Year: '2013', Turnover: 139.9, Margin: 85 },
    { Year: '2014', Turnover: 167, Margin: 75 },
    { Year: '2015', Turnover: 192.1, Margin: 75 },
    { Year: '2016', Turnover: 220, Margin: 76 },
    { Year: '2017', Turnover: 243.3, Margin: 76 },
    { Year: '2018', Turnover: 267.8, Margin: 69 },
    { Year: '2019', Turnover: 289.3, Margin: 76 },
    { Year: '2020', Turnover: 205.7, Margin: 66 },
    { Year: '2021', Turnover: 304.9, Margin: 76 },
    { Year: '2022', Turnover: 332.6, Margin: 74 },
    { Year: '2023', Turnover: 359, Margin: 74 }
  ]
  

  // state for completion
  const [complete, setComplete] = useState(false)

  // manageing the modal pop up for property search
  const [waitlistShow, setWaitlistShow] = useState(false)
  
  // cstate for whether email eexists
  const [emailExists, setEmailExists] = useState(false)
  
  // close modal
  const handleWaitlistClose = () => {
    setWaitlistShow(false)
  }
  
  // show the modal
  const handleWaitlistShow = (e) => {
    setErrors(true)
    setComplete(false)
    setWaitlistShow(true)
  }
  
  // set the state for the waitlist signup data capture
  const [waitlistData, setWaitlistData] = useState({
    email: '',
    channel: 'consumer',
    preferences: false,
  })
  

  // state for errors
  const [errors, setErrors] = useState(false)

  // set state if email is valid
  const [validEmail, setValidEmail] = useState(false)
  
  // determine whether the waitlist email entered is valid
  const handleChange = (e) => {
    setWaitlistData({ ...waitlistData, [e.target.name]: e.target.value.toLowerCase() })
    // console.log(e.target.value)
  }
  
  useEffect(() => {
    if (isEmail(waitlistData.email)) {
      setValidEmail(true)
      setErrors(false)
    } else if (!isEmail(waitlistData.email)) {
      setValidEmail(false)
    }
  }, [waitlistData.email])
  
  // submit email address to waitlist
  const handleSubmit = async (e) => {
    setErrors(false)
    e.preventDefault()
    // console.log('trying')
    ReactGA.event({
      category: 'User',
      action: 'Clicked Button', 
      label: 'Submit join waitlist',
    })
  
    try {
      // console.log('trying')
      const { data } = await axios.post('/api/waitlist/', waitlistData)
      setComplete(true)
    } catch (err) {
      // console.log('incorrect data error')
      setErrors(true)
    }
  }
    
  
  // cheeck email
  const checkEmail = async (e) => {
    e.preventDefault()
    setComplete(false)
    setWaitlistShow(true)
    ReactGA.event({
      category: 'User',
      action: 'Clicked Button', 
      label: 'Join waitlist',
    })
  
    try {
      const response = await axios.post('/api/waitlist/check-email/', waitlistData)
      setEmailExists(true)
    } catch (err) {
      console.error('An error occurred while making the request:', err)
      if (err.response) {
        setEmailExists(false)
      } 
    }
  }


  return (
    <>
      <section className='blog-page'>
        <NavBar />
        <section className='blog-title-section'>
          <h1 className='blog-title'>Redefining Property Search: Our Blueprint for the Future</h1>
          <p className='blog-date'>📅 Published August 2023</p>
          <p className='blog-time'>⏰ 5 min read</p>

        </section>

        <section className='main-body'>
          <p className='paragraph'>In the early 2000s, when Rightmove made its debut, few could have anticipated the seismic shift it would instigate in property searches. Over the years, these platforms have grown exponentially, now capturing an astonishing 90% of the initial search action. Rightmove, in particular, has weathered various contenders, from Globrix (2008) in the early stages, to more recent challengers like PurpleBricks and Boomin. Yet, as it faces off with Zoopla and OnTheMarket, its dominance remains unyielding, covering roughly 85% of the market, and recently marking a 10% surge in H1 2023 revenues.</p>

          <h3 className='sub-title'>What&apos;s the problem?</h3>
          <p className='paragraph'>For all its growth and domination, the portal model is stagnant. A decade has flown by with little in terms of technological or functional evolution from these portals. The core offering of these platforms hasn&apos;t altered much since their inception. Their lack of responsiveness to technological advancements in parallel sectors is evident.</p>
          <p className='paragraph'>Our research shows that customer experience could be elevated with simple alterations, such as filter options by square footage, bathrooms or property tenure. Of course, there is a counter-argument that such tweaks may not provide the right volume traffic for select properties. However, this stance merely stalls the inevitable decision by the customer once presented with all of the facts, and limits their experience.</p>
          <p className='paragraph'>This has resulted in a self-perpetuating cycle of anti-change. Estate agents, almost universally, resort to Rightmove for listings. As a result, Rightmove boasts a comprehensive property catalogue, drawing consumers in droves — a staggering 100 million views monthly. Clicks increase and profits rise, but limited benefits cascade through to the customer. There is no impetus for innovation.</p>
          <div className='bar-line-chart'>
            <p>Rightmove annual results from 2005-2023</p>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="Year" colorProfile='#051885' tick={{ fill: '#051885', fontSize: '0.8rem', fontFamily: 'Poppins' }}  />
                <YAxis yAxisId="left" orientation="left" width={70} tick={{ fill: '#051885', fontSize: '0.8rem', fontFamily: 'Poppins' }}>
                  <Label value="Turnover (m)" angle={-90} position='insideLeft' offset={20} style={{ textAnchor: 'middle', fill: '#051885', fontFamily: 'Poppins', fontSize: '0.8rem' }} />

                </YAxis>
                <YAxis yAxisId="right" orientation="right" width={70} domain={[0, 100]}  tick={{ fill: '#051885', fontSize: '0.8rem', fontFamily: 'Poppins' }}>
                  <Label value="Margin (%)" angle={90} position='insideLeft' offset={50} style={{ textAnchor: 'middle', fill: '#051885', fontFamily: 'Poppins', fontSize: '0.8rem' }} />

                </YAxis>
                <Tooltip formatter={(value, name) => name === 'Margin' ? `${value}%` : value}/>
                <Legend wrapperStyle={{ fontSize: '0.8rem', fontFamily: 'Poppins' }} />
                <Bar yAxisId="left" dataKey="Turnover" fill="#051885" />
                <Line yAxisId="right" type="monotone" dataKey="Margin" stroke="#FFA7E5"  dot={true} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <h3 className='sub-title'>The Digital Revolution: A low hanging fruit</h3>

          <p className='paragraph'>We are living through an age of technological transformation. Annually, we witness breakthroughs, and the past year was no exception. The likes of ChatGPT and Bard have revolutionised our online search behaviour; an enormous and exciting step change providing a clear opportunity for the property search sector.</p>
          <p className='paragraph'>This is starting to trickle through. OnTheMarket&apos;s recent announcement reveals a paradigm shift: as of July 2023, buyers can articulate their property desires using free text - an early example of AI fuelling the search process. A property search could now look like for example: “2-bedroom, 2-bathroom flats in London with outdoor space for less than £600,000.”</p>
          <p className='paragraph'>Soon, this feature will be integrated into most platforms. However, its impact on user experience is still under scrutiny. The current &lsquo;tick box&rsquo; approach ensures users don&apos;t miss anything important from their search, so we would argue that broadening the search would go much further in adding value for customers, rather than changing the mechanism.</p>
          <p className='paragraph'>Clearly these changes are promising, but the industry requires further shakeups.</p>


          <h3 className='sub-title'>A Changing Consumer Landscape</h3>
          <p className='paragraph'>Research by Eventbrite reveals a behavioural shift: 74% of Millennials and Gen Z express a preference for experiences over desirable products. This not only reflects an overall change in purchasing attitudes, but also underscores the significance of optimal living conditions that cater to better life experiences.</p>

          <h3 className='sub-title'>Charting a New Course with Wittle</h3>
          <p className='paragraph'>This is where Wittle steps in. Our mission is not just to offer another property search platform but to revolutionise the way consumers approach the process. Wittle doesn&apos;t just present properties; it encapsulates a lifestyle, making sure lifestyle and needs are front and centre of the search. From school catchments to local dining spots, we provide an in-depth view of a richly-lived life.</p>
          <p className='paragraph'>Wittle is at the forefront of technological development in property search and is using technology to bring confidence to people&apos;s property decisions. As Wittle forges ahead, join our waitlist to be first to hear about our launch.</p>


          <hr className='insight-divider' />

          <div className='cta'>
            <h3>Work for an agency?</h3>
            <h4>Wittle will allow you to be at the  centre of this change, giving you a major competitive advantage. Get access to our Wittle agents portal and blow your customers away.</h4>
            <button className='agents-cta' onClick={() => navigate('/agents')} >I&apos;m interested</button>
          </div>
          <div className='cta'>
            <h3>Are you an individual who wants a better way to find property?</h3>
            <h4>If you want to a new way of finding properties that genuinely suit you and your lifestyle, sign up to our waitlist and we will get in touch with early access to Wittle search when it is ready.</h4>
            <div className='waitlist-consumer'>
              <input className='waitlist-email' name='email' placeholder='✉️ Join the waitlist' onChange={handleChange}></input>
              <button className='consumer-sign-up' onClick={checkEmail}>Join</button>
              <WaitlistSignup
                waitlistShow={waitlistShow}
                handleWaitlistClose={handleWaitlistClose}
                validEmail={validEmail}
                errors={errors}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                complete={complete}
                emailExists={emailExists} />
            </div>
          </div>


          <hr className='insight-divider' />




        </section>



      </section>



    </>
  )
}

export default RedefiningPropertySearch