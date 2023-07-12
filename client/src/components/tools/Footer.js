


const Footer = ({ textColour, pageType }) => {



  return (
    <>
      <section className='website-footer no-print' id={pageType}>
        <p style={{ color: textColour }}>Wittle Technology Limited is a registered company in England and Wales with corporation number 14326945.</p>
        <p style={{ color: textColour }}>Copyright © Wittle Technology Limited. All rights reserved.</p>
      </section>
    </>
  )
}

export default Footer