import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts'



const PropertySummary = ({ neighbourhoodScore, postcodeData }) => {

  

  // neighbourhood data
  const data = [
    { name: 'Score', value: neighbourhoodScore },
    { name: 'Remainder', value: 100 - neighbourhoodScore }
  ]

  const COLORS = ['#ED6B86', 'rgba(26, 39, 108, 0.15)']


  // greenspace data
  const greenspaceData = [
    { name: 'Score', value: postcodeData ? Math.round(postcodeData[0].parks_postcode_summary.percentile * 100) : '' },
    { name: 'Remainder', value: postcodeData ? Math.round(100 - (postcodeData[0].parks_postcode_summary.percentile * 100)) : '' }
  ]

  // restaurant data
  const restaurantData = [
    { name: 'Score', value: postcodeData ? Math.ceil(postcodeData[0].restaurants.normal_percentile * 100) : '' },
    { name: 'Remainder', value: postcodeData ? Math.ceil((1 - postcodeData[0].restaurants.normal_percentile) * 100) : '' }
  ]

  // crime data
  const crimeData = [
    { name: 'Score', value: postcodeData ? Math.round(postcodeData[0].crime[0].percentile * 100) : '' },
    { name: 'Remainder', value: postcodeData ? Math.round((1 - postcodeData[0].crime[0].percentile) * 100) : '' }
  ]


  // tubes data
  const tubeData = [
    { name: 'Score', value: postcodeData ? Math.ceil(postcodeData[0].tubes.percentile * 100) : '' },
    { name: 'Remainder', value: postcodeData ? Math.ceil((1 - postcodeData[0].tubes.percentile) * 100) : '' }
  ]

  const secondariesData = [
    { name: 'Score', value: postcodeData ? Math.ceil(postcodeData[0].secondaries.total_score_percentile * 100) : '' },
    { name: 'Remainder', value: postcodeData ? Math.ceil((1 - postcodeData[0].secondaries.total_score_percentile) * 100) : '' }
  ]



  return (

    <>
      <section className="summary-section">
        <div className="row">

          {/* Neighbourhood score */}
          <div className="individual-box">
            <div className="pie-chart" >
              <PieChart width={100} height={100}>
                <Pie
                  data={data}
                  cx={40}
                  cy={50}
                  innerRadius={33}
                  outerRadius={45}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  startAngle={0}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      startAngle={index === 0 ? 0 : (360 * data[index - 1].value) / 100} // Set the start angle dynamically
                      endAngle={(360 * entry.value) / 100} // Set the end angle dynamically                    
                    />
                  ))}
                  <Label
                    value={`${neighbourhoodScore}%`}
                    position="center"
                    fontSize={15}
                    
                    fill='black'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              <h1>Neighbourhood score</h1>
            </div> 
          </div>  

          {/* Greenspace stat */}
          <div className="individual-box">
            <div className="pie-chart" >
              <PieChart width={100} height={100}>
                <Pie
                  data={greenspaceData}
                  cx={40}
                  cy={50}
                  innerRadius={33}
                  outerRadius={45}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  startAngle={0}
                >
                  {greenspaceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      startAngle={index === 0 ? 0 : (360 * data[index - 1].value) / 100} // Set the start angle dynamically
                      endAngle={(360 * entry.value) / 100} // Set the end angle dynamically                    
                    />
                  ))}
                  <Label
                    value={`${greenspaceData[0].value > 50 ? greenspaceData[1].value : greenspaceData[0].value}%`}
                    position="center"
                    fontSize={15}
                    
                    fill='black'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              {greenspaceData[0].value > 50 ?  <h1>within top {greenspaceData[1].value}% of areas of London for access to greenspace</h1> : <h1>within bottom {greenspaceData[0].value}% of areas of London for access to greenspace</h1>}
            </div> 
          </div>  

          {/* Secondaries stat */}
          <div className="individual-box">
            <div className="pie-chart" >
              <PieChart width={100} height={100}>
                <Pie
                  data={secondariesData}
                  cx={40}
                  cy={50}
                  innerRadius={33}
                  outerRadius={45}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  startAngle={0}
                >
                  {secondariesData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      startAngle={index === 0 ? 0 : (360 * data[index - 1].value) / 100} // Set the start angle dynamically
                      endAngle={(360 * entry.value) / 100} // Set the end angle dynamically                    
                    />
                  ))}
                  <Label
                    value={`${100 - secondariesData[0].value}%`}
                    position="center"
                    fontSize={15}
                    
                    fill='black'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              <h1>within top {100 - secondariesData[0].value}% of areas of London for secondary schools</h1>
            </div> 
          </div>  

          {/* Restaurant stat */}
          <div className="individual-box">
            <div className="pie-chart" >
              <PieChart width={100} height={100}>
                <Pie
                  data={restaurantData}
                  cx={40}
                  cy={50}
                  innerRadius={33}
                  outerRadius={45}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  startAngle={0}
                >
                  {restaurantData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      startAngle={index === 0 ? 0 : (360 * data[index - 1].value) / 100} // Set the start angle dynamically
                      endAngle={(360 * entry.value) / 100} // Set the end angle dynamically                    
                    />
                  ))}
                  <Label
                    value={`${100 - restaurantData[0].value}%`}
                    position="center"
                    fontSize={15}
                    
                    fill='black'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              <h1>within best {100 - restaurantData[0].value}% of areas of London for number of quality restaurants</h1>
            </div> 
          </div>  

          {/* <div className="row"> */}

          {/* Crime score */}
          <div className="individual-box">
            <div className="pie-chart" >
              <PieChart width={100} height={100}>
                <Pie
                  data={crimeData.reverse()}
                  cx={40}
                  cy={50}
                  innerRadius={33}
                  outerRadius={45}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  startAngle={0}
                >
                  {crimeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      startAngle={index === 0 ? 0 : (360 * data[index - 1].value) / 100} // Set the start angle dynamically
                      endAngle={(360 * entry.value) / 100} // Set the end angle dynamically                    
                    />
                  ))}
                  <Label
                    value={`${crimeData[1].value > 50 ? crimeData[0].value : crimeData[1].value}%`}
                    position="center"
                    fontSize={15}
                    
                    fill='black'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              {(crimeData[1].value) > 50 ? <h1>In the highest {crimeData[0].value}% of areas in London for reported crimes</h1> : <h1>In the lowest {(crimeData[1].value)}% of areas in London for reported crimes</h1>}
            </div> 
          </div>  

          {/* Tubes stat */}
          <div className="individual-box">
            <div className="pie-chart" >
              <PieChart width={100} height={100}>
                <Pie
                  data={tubeData}
                  cx={40}
                  cy={50}
                  innerRadius={33}
                  outerRadius={45}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  startAngle={0}
                >
                  {tubeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      startAngle={index === 0 ? 0 : (360 * data[index - 1].value) / 100} // Set the start angle dynamically
                      endAngle={(360 * entry.value) / 100} // Set the end angle dynamically                    
                    />
                  ))}
                  <Label
                    value={`${100 - tubeData[0].value}%`}
                    position="center"
                    fontSize={15}
                    
                    fill='black'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              <h1>within top {100 - tubeData[0].value}% of areas of London for access to tubes</h1>
            </div> 
          </div>  

          {/* Restaurant stat */}
          {/* <div className="individual-box">
            <div className="pie-chart" >
              <PieChart width={100} height={100}>
                <Pie
                  data={restaurantData}
                  cx={40}
                  cy={50}
                  innerRadius={33}
                  outerRadius={45}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  startAngle={0}
                >
                  {restaurantData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      startAngle={index === 0 ? 0 : (360 * data[index - 1].value) / 100} // Set the start angle dynamically
                      endAngle={(360 * entry.value) / 100} // Set the end angle dynamically                    
                    />
                  ))}
                  <Label
                    value={`${restaurantData[0].value}%`}
                    position="center"
                    fontSize={15}
                    
                    fill='black'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              <h1>within top {restaurantData[0].value}% of areas of London for restaurants</h1>
            </div> 
          </div>   */}
        </div>    
      </section>
    
    </>
  )
}

export default PropertySummary