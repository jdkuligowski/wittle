import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts'



const PropertySummary = ({ neighbourhoodScore, postcodeData }) => {

  // neighbourhood data
  const data = [
    { name: 'Score', value: neighbourhoodScore },
    { name: 'Remainder', value: 100 - neighbourhoodScore }
  ]

  const COLORS = ['#051885', '#FFA7E5']


  // greenspace data
  const greenspaceData = [
    { name: 'Score', value: postcodeData[0].parks_lsoa[0].london_percentile },
    { name: 'Remainder', value: 100 - postcodeData[0].parks_lsoa[0].london_percentile }
  ]

  // restaurant data
  const restaurantData = [
    { name: 'Score', value: Math.ceil(postcodeData[0].restaurants.normal_percentile * 100) },
    { name: 'Remainder', value: Math.ceil((1 - postcodeData[0].restaurants.normal_percentile) * 100) }
  ]

  // crime data
  const crimeData = [
    { name: 'Score', value: Math.ceil(postcodeData[0].crime[0].percentile * 100) },
    { name: 'Remainder', value: Math.ceil((1 - postcodeData[0].crime[0].percentile) * 100) }
  ]


  // tubes data
  const tubeData = [
    { name: 'Score', value: Math.ceil(postcodeData[0].tubes.percentile * 100) },
    { name: 'Remainder', value: Math.ceil((1 - postcodeData[0].tubes.percentile) * 100) }
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
                  innerRadius={25}
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
                    fontWeight="bold"
                    fill='#FFA7E5'
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
                  innerRadius={25}
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
                    value={`${100 - greenspaceData[0].value}%`}
                    position="center"
                    fontSize={15}
                    fontWeight="bold"
                    fill='#FFA7E5'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              <h1>within top {100 - greenspaceData[0].value}% of areas of London for access to greenspace</h1>
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
                  innerRadius={25}
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
                    fontWeight="bold"
                    fill='#FFA7E5'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              <h1>within top {100 - restaurantData[0].value}% of areas of London for restaurants</h1>
            </div> 
          </div>  
        </div>    

        <div className="row">

          {/* Crime score */}
          <div className="individual-box">
            <div className="pie-chart" >
              <PieChart width={100} height={100}>
                <Pie
                  data={crimeData.reverse()}
                  cx={40}
                  cy={50}
                  innerRadius={25}
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
                    value={`${100 - crimeData[0].value}%`}
                    position="center"
                    fontSize={15}
                    fontWeight="bold"
                    fill='#FFA7E5'
                  />
                </Pie>
              </PieChart>
            </div>
            <div className="content">
              <h1>In the top {100 - crimeData[0].value}% of areas in London for reported crimes</h1>
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
                  innerRadius={25}
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
                    fontWeight="bold"
                    fill='#FFA7E5'
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
                  innerRadius={25}
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
                    fontWeight="bold"
                    fill='#FFA7E5'
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