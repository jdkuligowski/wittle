import { BarChart, Bar, PieChart, Pie, Sector, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'





const ProfileAdmin = ({ livingDetails }) => {


  const [monthlyCalc1, setMonthlyCalc1] = useState()
  const [monthlyCalc2, setMonthlyCalc2] = useState()
  const [monthlyCalc3, setMonthlyCalc3] = useState()
  const [currentMonth, setCurrentMonth] = useState()


  function isDateBetween(startDate, endDate, dateToCheck) {
    return startDate <= dateToCheck && endDate >= dateToCheck
  }


  useEffect(() => {
    if (livingDetails) {
      const calculation = [
        {
          mortgage: livingDetails.mortgage_value,
          rent: livingDetails.rent_value,
          council: livingDetails.council_tax_value,
          energy: livingDetails.energy_value,
          electric: livingDetails.electric_value,
          gas: livingDetails.gas_value,
          broadband: livingDetails.broadband_value,
          satellite: livingDetails.sky_value,
          netflix: livingDetails.netflix_value,
          amazon: livingDetails.amazon_value,
          disney: livingDetails.disney_value,
          apple: livingDetails.apple_value,
          tv_license: livingDetails.tv_value,
          phone: livingDetails.phone_value,
          gym: livingDetails.gym_value,
          essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value,
          // optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
          tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
          total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
        }
      ]
      setMonthlyCalc1(calculation)
      console.log('admin monthly values ->', calculation)
    }
  }, [livingDetails])


  useEffect(() => {
    if (monthlyCalc1) {
      const calculation =
        [
          { ...monthlyCalc1[0], month: 'Jan-23', insurance: isDateBetween('2023-01-01', '2023-01-31', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-01-01', '2023-01-31', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Feb-23', insurance: isDateBetween('2023-02-01', '2023-02-28', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-02-01', '2023-02-28', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Mar-23', insurance: isDateBetween('2023-03-01', '2023-03-31', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-03-01', '2023-03-31', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Apr-23', insurance: isDateBetween('2023-04-01', '2023-04-30', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-04-01', '2023-04-30', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'May-23', insurance: isDateBetween('2023-05-01', '2023-05-31', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-05-01', '2023-05-31', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Jun-23', insurance: isDateBetween('2023-06-01', '2023-06-30', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-06-01', '2023-06-30', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Jul-23', insurance: isDateBetween('2023-07-01', '2023-07-31', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-07-01', '2023-07-31', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Aug-23', insurance: isDateBetween('2023-08-01', '2023-08-31', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-08-01', '2023-08-31', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Sep-23', insurance: isDateBetween('2023-09-01', '2023-09-30', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-09-01', '2023-09-30', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Oct-23', insurance: isDateBetween('2023-10-01', '2023-10-31', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-10-01', '2023-10-31', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Nov-23', insurance: isDateBetween('2023-11-01', '2023-11-30', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-11-01', '2023-11-30', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 },
          { ...monthlyCalc1[0], month: 'Dec-23', insurance: isDateBetween('2023-12-01', '2023-12-31', livingDetails.insurance_date) ? livingDetails.insurance_value : 0, boiler: isDateBetween('2023-12-01', '2023-12-31', livingDetails.boiler_date) ? livingDetails.boiler_value : 0 }
        ]
      setMonthlyCalc2(calculation)
      console.log('monthly totals ->', calculation)
    }
  }, [monthlyCalc1])


  useEffect(() => {
    if (monthlyCalc2) {
      const calculation =
        [
          {
            ...monthlyCalc2[0],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[0].boiler + monthlyCalc2[0].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[0].boiler + monthlyCalc2[0].insurance,
          },
          {
            ...monthlyCalc2[1],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[1].boiler + monthlyCalc2[1].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[1].boiler + monthlyCalc2[1].insurance,
          },
          {
            ...monthlyCalc2[2],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[2].boiler + monthlyCalc2[2].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[2].boiler + monthlyCalc2[2].insurance,
          },
          {
            ...monthlyCalc2[3],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[3].boiler + monthlyCalc2[3].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[3].boiler + monthlyCalc2[3].insurance,
          },
          {
            ...monthlyCalc2[4],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[4].boiler + monthlyCalc2[4].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[4].boiler + monthlyCalc2[4].insurance,
          },
          {
            ...monthlyCalc2[5],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[5].boiler + monthlyCalc2[5].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[5].boiler + monthlyCalc2[5].insurance,
          },
          {
            ...monthlyCalc2[6],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[6].boiler + monthlyCalc2[6].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[6].boiler + monthlyCalc2[6].insurance,
          },
          {
            ...monthlyCalc2[7],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[7].boiler + monthlyCalc2[7].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[7].boiler + monthlyCalc2[7].insurance,
          },
          {
            ...monthlyCalc2[8],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[8].boiler + monthlyCalc2[8].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[8].boiler + monthlyCalc2[8].insurance,
          },
          {
            ...monthlyCalc2[9],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[9].boiler + monthlyCalc2[9].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[9].boiler + monthlyCalc2[9].insurance,
          },
          {
            ...monthlyCalc2[10],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[10].boiler + monthlyCalc2[10].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[10].boiler + monthlyCalc2[10].insurance,
          },
          {
            ...monthlyCalc2[11],
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[11].boiler + monthlyCalc2[11].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[11].boiler + monthlyCalc2[11].insurance,
          }
        ]
      setMonthlyCalc3(calculation)
      console.log('monthly totals 2 ->', calculation)
    }
  }, [monthlyCalc2])

  const COLORS = ['#051885', '#FFA7E5', 'grey', '#ca96cd', '#9c7ba4']


  useEffect(() => {
    if (monthlyCalc3) {
      const calculation =
        [
          {
            value: monthlyCalc3[0].tv_total,
            tag: 'TV',
          },
          {
            value: monthlyCalc3[0].mortgage,
            tag: 'Mortgage',
          },
          {
            value: monthlyCalc3[0].council,
            tag: 'Council Tax',
          },
          {
            value: monthlyCalc3[0].energy,
            tag: 'Energy',
          },
          {
            value: monthlyCalc3[0].phone + monthlyCalc3[0].gym,
            tag: 'Other',
          }
        ]
      setCurrentMonth(calculation)
      console.log('current month ->', calculation)
    }
  }, [monthlyCalc3])


  return (
    <>
      <div className='admin-portal'>
        <div className='left-detail'>
          <div className='admin-intro-section'>
            <h1 className='admin-title'>Summary</h1>
            <h3>Get insights and keep on top of your household bills in one place</h3>
            {monthlyCalc3 ?
              <div className='top-insights'>
                <div className='insight'>
                  <h1><NumericFormat value={monthlyCalc3[0].total} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h1>
                  <p>Average monthly bills</p>
                </div>
                <div className='insight'>
                  <h1><NumericFormat value={monthlyCalc3[0].essential} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h1>
                  <p>Essential monthly bills</p>
                </div>
                <div className='insight'>
                  <h1><NumericFormat value={monthlyCalc3[0].optional} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h1>
                  <p>Optional monthly bills</p>
                </div>
              </div>
              : ''}
          </div>
          <div className='admin-list-section'>
            <h1 className='admin-title'>Your bills</h1>
          </div>
        </div>
        <div className='right-detail'>
          <div className='bar-section'>
            <h1 className='admin-title'>Spend by month</h1>
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            {monthlyCalc3 ?
              <BarChart
                width={700}
                height={250}
                data={monthlyCalc3}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis fontSize={'0.7rem'} fontFamily={'poppins'} dataKey='month' />
                <YAxis fontSize={'0.7rem'} fontFamily={'poppins'} dataKey='total' />
                <Tooltip />
                {/* <Legend /> */}
                {/* <Bar dataKey="total" fill="#FFA7E5" /> */}
                <Bar dataKey="total" fill="#051885" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
              </BarChart>
              : ''}
            {/* </ResponsiveContainer> */}
          </div>
          <div className='donut-section'>
            <h1 className='admin-title'>Monthly</h1>

            <div className='donut-box'>
              <div className='donut-detail'>
                {currentMonth ?
                  <PieChart width={300} height={300}>
                    <Pie
                      data={currentMonth}
                      cx={150}
                      cy={140}
                      innerRadius={90}
                      outerRadius={140}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      margin={{ left: 5 }}
                    >
                      {currentMonth.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                  : ''}
              </div>
              {monthlyCalc3 ?
                <div className='donut-content'>
                  <div className='legend-row'>
                    <div className='legend-box' id='one'></div>
                    <h3>📺 TV: £{monthlyCalc3[0].tv_total}</h3>
                  </div>
                  <div className='legend-row'>
                    <div className='legend-box' id='two'></div>
                    <h3>🧾 Mortgage: £{monthlyCalc3[0].mortgage}</h3>

                  </div>
                  <div className='legend-row'>
                    <div className='legend-box' id='three'></div>
                    <h3>🏛 Council Tax: £{monthlyCalc3[0].council}</h3>
                  </div>
                  <div className='legend-row'>
                    <div className='legend-box' id='four'></div>
                    <h3>🔥 Energy: £{monthlyCalc3[0].energy}</h3>
                  </div>
                  <div className='legend-row'>
                    <div className='legend-box' id='five'></div>
                    <h3>🧐 Other: £{monthlyCalc3[0].phone + monthlyCalc3[0].gym}</h3>
                  </div>
                </div>
                : ''}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileAdmin