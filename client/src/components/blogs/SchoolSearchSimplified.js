import NavBar from '../tools/NavBar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmail } from 'validator'
import ReactGA from 'react-ga'
import WaitlistSignup from '../helpers/modals/WaitlistSignup'





const SchoolSearchSimplified = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const stateSchoolData = [
    { name: 'Kensington & Chelsea', value: '46%' },
    { name: 'Richmond upon Thames', value: '45%' },
    { name: 'Bromley', value: '28%' },
    { name: 'Hammersmith & Fulham', value: '24%' },
    { name: 'Wandsworth', value: '22%' },
    { name: 'Newham', value: '22%' },
    { name: 'Camden', value: '21%' },
    { name: 'Islington', value: '21%' },
    { name: 'Sutton', value: '21%' },
    { name: 'Waltham Forest', value: '18%' }
  ]

  const independentSchoolData = [
    { name: 'Kensington & Chelsea', number: 30, percentage: '49%' },
    { name: 'Camden', number: 29, percentage: '39%' },
    { name: 'Hackney', number: 29, percentage: '32%' },
    { name: 'Barnet', number: 26, percentage: '20%' },
    { name: 'Wandsworth', number: 24, percentage: '25%' },
    { name: 'Westminster', number: 21, percentage: '32%' },
    { name: 'Richmond upon Thames', number: 21, percentage: '31%' },
    { name: 'Hammersmith & Fulham', number: 17, percentage: '28%' },
    { name: 'Croydon', number: 15, percentage: '13%' },
    { name: 'Brent', number: 13, percentage: '16%' }
  ]

  const catchmentData = [
    { name: 'Wandsworth', value: 631 },
    { name: 'Sutton', value: 710 },
    { name: 'Greenwich', value: 735 },
    { name: 'Kensington & Chelsea', value: 808 },
    { name: 'Hammersmith & Fulham', value: 811 },
    { name: 'Hackney', value: 815 },
    { name: 'Brent', value: 882 },
    { name: 'Enfield', value: 940 },
    { name: 'Newham', value: 975 },
    { name: 'Lambeth', value: 993 }
  ]

  const ofstedData = [
    { name: 'Kensington & Chelsea', value: '68%' },
    { name: 'Richmond upon Thames', value: '57%' },
    { name: 'Lambeth', value: '41%' },
    { name: 'Camden', value: '40%' },
    { name: 'Hammersmith & Fulham', value: '39%' },
    { name: 'Hackney', value: '38%' },
    { name: 'Redbridge', value: '38%' },
    { name: 'Wandsworth', value: '35%' },
    { name: 'Barnet', value: '32%' },
    { name: 'Islington', value: '28%' }
  ]

  const faithData = [
    { name: 'Does not apply', value: '67.5%' },
    { name: 'Church of England', value: '14.1%' },
    { name: 'Roman Catholic', value: '13.6%' },
    { name: 'Other', value: '1.8%' },
    { name: 'Jewish', value: '1.5%' },
    { name: 'Christian', value: '1.0%' },
    { name: 'Muslim', value: '0.5%' }
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
          <h1 className='blog-title'>School Search Simplified: An In-Depth Analysis of London&apos;s Primary Schools</h1>
          <p className='blog-date'>📅 Published August 2023</p>
          <p className='blog-time'>⏰ 5 min read</p>

        </section>

        <section className='main-body'>
          <p className='paragraph'>Finding the right school for your children is a significant life decision, influencing not only their life trajectory, but also your choice of where to live. Despite the increasing age of first-time parenting, a whopping 82% of the UK population will, at some point, face this decision. Whether buying a property or renting, for most people, school considerations inevitably become intertwined with housing decisions.</p>
          <p className='paragraph'>The task of actually finding the optimal school for your children is daunting. There is a multitude of factors at play: school performance, catchment areas, selection criteria, in addition to personal choices such as school size, gender composition and faith. We’re here to help you to navigate this minefield.</p>

          <h3 className='sub-title'>Decoding Selection Criteria</h3>
          <p className='paragraph'>It’s crucial to remember that each council within the UK maintains its unique rules governing school admissions. Therefore, to get a precise understanding, make sure you check out your local council’s guidelines. However, there is a general hierarchy of preference for school admissions.</p>

          <h5 className='mini-title'>State schools with no specific religion</h5>
          <div className='bullet-section'>
            <div className='bullet'>
              <div className='value'>1</div>
              <p className='bullet-title'>Children in Care</p>
              <p className='bullet-text'>Those in, or who have been in care, are given the highest priority.</p>
            </div>
            <div className='bullet'>
              <div className='value'>2</div>
              <p className='bullet-title'>Special Circumstances</p>
              <p className='bullet-text'>Children with particular social or medical needs related to a specific school are also given a high priority, subject to the provision of independent evidence.</p>
            </div>
            <div className='bullet'>
              <div className='value'>3</div>
              <p className='bullet-title'>The Sibling Rule</p>
              <p className='bullet-text'>A child with a sibling presently enrolled in the school (from reception to year 5) can also expect preferential treatment.</p>
            </div>
            <div className='bullet'>
              <div className='value'>4</div>
              <p className='bullet-title'>Parent-Teacher Advantage</p>
              <p className='bullet-text'>Children whose parent has been a qualified teacher at the school for the requisite period will be given priority.</p>
            </div>
            <div className='bullet'>
              <div className='value'>5</div>
              <p className='bullet-title'>Geographical Proximity</p>
              <p className='bullet-text'>Finally, the distance between your home and the school, generally known as the catchment area, plays a decisive role.</p>
            </div>
          </div>
          
          <h5 className='mini-title'>Religious State Schools</h5>
          <p className='paragraph'>These schools typically mirror the above criteria, albeit with an added weightage for children associated with specific churches or faith centres. In some cases, there are exceptions for children outside the faith, but in general, proof of adherence to the faith tends to play a central role in admissions.</p>

          <h5 className='mini-title'>Independent Schools</h5>
          <p className='paragraph'>Entry into independent or fee-paying schools usually hinges on financial capacity and the child&apos;s performance in entrance exams.</p>


          <div className='catchment-performance-section'>
            <div className='catchment-performance-text'>
              <h3 className='sub-title'>The Catchment Area Conundrum</h3>
              <p className='paragraph'>Catchment areas can vary significantly - particularly in London, and are influenced largely by the school&apos;s reputation, performance, and local population density. In some cases, the catchment radius for London schools can be less than 250m, and a fifth of all schools&apos; catchment areas are less than a kilometre.</p>
              <p className='paragraph'>Bear in mind that this process isn&apos;t an exact science. Catchment areas may vary annually due to the fluctuating numbers of applicants, introducing an additional layer of complexity.</p>

          
              <h3 className='sub-title'>School Performance: A Critical Assessment</h3>
              <p className='paragraph'>A survey by The Times revealed that 64% of teacher&apos;s question Ofsted&apos;s ability to consistently and accurately evaluate school performance. This is a tricky situation for parents, as Ofsted is the only independent body assessing overall school performance. To counter this, Wittle incorporates KS2 performance indicators along with Ofsted ratings when evaluating schools.</p>
              <p className='paragraph'>State schools are all measured on two primary metrics across all subjects: the percentage of students meeting the KS2 standard and the percentage exceeding it. These metrics provide a more nuanced understanding of the school&apos;s overall performance.</p>

            
            </div>
            <div className='catchment-performance-chart'>
              <h4 className='chart-title'>Chart A: How school performance varies by the size of the school&apos;s catchment area across London</h4>
              <div className='row'>
                <h4>High performing</h4>
                <div className='box'>31% of schools</div>
                <div className='box'>6% of schools</div>
              </div>
              <div className='row'>
                <h4>Poor performing</h4>
                <div className='box'>42% of schools</div>
                <div className='box'>20% of schools</div>
              </div>
              <div className='axis'>
                <h4></h4>
                <div className='box'>Small catchment area</div>
                <div className='box'>Big catchment area</div>
              </div>
            </div>
          </div>
          <h5 className='sub-title' id='reduced-margin'>How does Wittle help?</h5>
          <p className='paragraph'>It’s easy to get tangled in the intricacies of properties, school performance and catchment areas. By dissecting chart A, we can outline four clear scenarios that demonstrate how Wittle provides clarity:</p>
          <div className='wittle-benefit-list'>
            <div className='benefit-row'>
              <div className='benefit-number'>1</div>
              <div className='benefit-detail'>
                <h3>High-Performing Schools, Small Catchment Areas (31%):</h3>
                <h4>If you’re chasing excellence, it&apos;s all about precision. Wittle&apos;s refined data ensures you pinpoint homes right in the heart of top-tier school territories.</h4>
              </div>
            </div>
            <div className='benefit-row'>
              <div className='benefit-number'>2</div>
              <div className='benefit-detail'>
                <h3>Underperforming Schools, Small Catchment Areas (42%):</h3>
                <h4>Intense competition doesn&apos;t always signal quality. Wittle strips away the facade, highlighting genuine performance so you won&apos;t be misled by high demand.</h4>
              </div>
            </div>
            <div className='benefit-row'>
              <div className='benefit-number'>3</div>
              <div className='benefit-detail'>
                <h3>High-Performing Schools, Expansive Catchment Areas (6%):</h3>
                <h4>They may be hard to come by, but these schools can provide excellence without geographic constraints. Wittle guides you to these wider horizons where top education isn&apos;t confined to postcodes.</h4>
              </div>
            </div>
            <div className='benefit-row'>
              <div className='benefit-number'>4</div>
              <div className='benefit-detail'>
                <h3>Underperforming Schools, Expansive Catchment Areas (20%):</h3>
                <h4>Transparency reveals the broader catchments where school performance might be lacking.</h4>
              </div>
            </div>
          </div>
          <p className='paragraph'>In today&apos;s data-rich world, it can be difficult to sift through the noise and make informed choices about significant life decisions. Wittle ensures you see beyond just the numbers. If schools are important to you when looking for a property, Wittle&apos;s got your back.</p>


          <hr className='insight-divider' />
          <h1 className='cta-break'>Like what you&apos;ve read so far?</h1>

          <div className='cta'>
            <h3>Work for an agency?</h3>
            <h4>This is the kind of knowledge Wittle can provide to your estate agency, giving you a major competitive advantage. Get access to our Wittle agents portal and blow your customers away.</h4>
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

            
          
          <h3 className='sub-title'>In the Spotlight: London&apos;s Top Primary Schools and Boroughs</h3>
          <p className='paragraph'>As part of our deep-dive into the maze of school selection, we&apos;ve pored over data from every nook and cranny of London, bringing you insights across five key areas. Not only do these analyses aim to shine a light on the murkier aspects of the school hunt, they also serve as a testament to how Wittle can elevate your property search journey.</p>

          <h5 className='mini-title'>State School Standouts</h5>
          <div className='table-section'>
            <p className='paragraph'>To kick things off, we&apos;ve ranked London&apos;s boroughs based on the proportion of their state schools that belong to the top 20% of schools in London. Here are the boroughs that came out on top:</p>
            <div className='table'>
              <div className='table-title' id='two-col'>
                <h4 className='column-1'>Local Authority</h4>
                <h4 className='column-2'>% top 20%</h4>
              </div>
              {stateSchoolData.map((item, index) => {
                return (
                  <>
                    <div className='table-content'>
                      <p className='column-1'>{item.name}</p>
                      <p className='column-2'>{item.value}</p>
                    </div>
                    <hr className='two-columns' />
                  </>
                )
              })}
            </div>
          </div>
          <hr className='insight-divider' />

          <h5 className='mini-title'>The Indpendent School Landscape</h5>
          <div className='table-section' id='reverse'>
            <p className='paragraph'>Unlike state schools, independent schools don&apos;t typically take KS2 exams, and Ofsted assessments are not mandatory. This can make gauging their performance a bit tricky. Nevertheless, we&apos;ve identified the boroughs boasting the highest volume of independent schools</p>
            <div className='table'>
              <div className='table-title' id='three-col'>
                <h4 className='column-1'>Local Authority</h4>
                <h4 className='column-2'># of Independent Schools</h4>
                <h4 className='column-3'>% of all schools that are Independent</h4>
              </div>
              {independentSchoolData.map((item, index) => {
                return (
                  <>
                    <div className='table-content'>
                      <p className='column-1'>{item.name}</p>
                      <p className='column-2'>{item.number}</p>
                      <p className='column-3'>{item.percentage}</p>
                    </div>
                    <hr className='three-columns' />
                  </>
                )
              })}
            </div>
          </div>
          <hr className='insight-divider' />

          <h5 className='mini-title'>The Catchment Area Tightrope</h5>
          <div className='table-section'>
            <p className='paragraph'>Some boroughs are significantly more crowded than others. Here&apos;s a look at the 10 boroughs where school catchment areas are the smallest on average:</p>
            <div className='table'>
              <div className='table-title' id='two-col'>
                <h4 className='column-1'>Local Authority</h4>
                <h4 className='column-2'>Average Catchment Area (m)</h4>
              </div>
              {catchmentData.map((item, index) => {
                return (
                  <>
                    <div className='table-content'>
                      <p className='column-1'>{item.name}</p>
                      <p className='column-2'>{item.value}</p>
                    </div>
                    <hr className='two-columns' />

                  </>
                )
              })}
            </div>
          </div>
          <hr className='insight-divider' />


          <h5 className='mini-title'>Deciphering Ofsted Reports</h5>
          <div className='table-section' id='reverse'>
            <p className='paragraph'>Ofsted might have its shortcomings, but its assessments remain the go-to measure of school performance. With this in mind, we&apos;ve outlined the 10 boroughs with the highest percentage of schools rated &apos;outstanding&apos; by Ofsted. As a benchmark, around 25% of London State Schools are rated &apos;outstanding&apos;</p>
            <div className='table'>
              <div className='table-title' id='two-col'>
                <h4 className='column-1'>Local Authority</h4>
                <h4 className='column-2'>% rated Outstanding</h4>
              </div>
              {ofstedData.map((item, index) => {
                return (
                  <>
                    <div className='table-content'>
                      <p className='column-1'>{item.name}</p>
                      <p className='column-2'>{item.value}</p>
                    </div>
                    <hr className='two-columns' />

                  </>
                )
              })}
            </div>
          </div>
          <hr className='insight-divider' />

          <h5 className='mini-title'>Faith Based Considerations</h5>
          <div className='table-section'>
            <p className='paragraph'>Finding a school that matches your faith can add another layer of complexity to the school hunt. Over two-thirds of schools in London have no religious affiliation. Meanwhile, Church of England and Roman Catholic schools make up a sizable minority, with other faiths constituting a small percentage of the total.</p>
            <div className='table'>
              <div className='table-title' id='two-col'>
                <h4 className='column-1'>Faith</h4>
                <h4 className='column-2'>% of total</h4>
              </div>
              {faithData.map((item, index) => {
                return (
                  <>
                    <div className='table-content'>
                      <p className='column-1'>{item.name}</p>
                      <p className='column-2'>{item.value}</p>
                    </div>
                    <hr className='two-columns' />

                  </>
                )
              })}
            </div>
          </div>
          <hr className='insight-divider' />



        </section>
        <section className='bottom-section'>
          <p className='paragraph'>We hope that by shining a light on the complexities and variables at play when selecting a school and a home, we&apos;ve made your path towards the perfect home a bit clearer.</p>
          <p className='paragraph'>Why not elevate your property search abilities further by signing up to the Wittle waitlist? Stay in the know and let us help you navigate this journey with confidence.</p>        

          <div className='cta'>
            {/* <h3>Are you an individual who wants a better way to find property?</h3>
            <h4>If you want to a new way of finding properties that genuinely suit you and your lifestyle, sign up to our waitlist and we will get in touch with early access to Wittle search when it is ready.</h4> */}
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
        </section>


      </section>



    </>
  )
}

export default SchoolSearchSimplified