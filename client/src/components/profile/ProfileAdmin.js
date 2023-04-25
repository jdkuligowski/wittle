import { BarChart, Bar, PieChart, Pie, Label, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import LivingAdminInputs from '../living/LivingAdminInputs'
import LivingSignup from '../helpers/modals/LivingSignup'





const ProfileAdmin = ({ loadUserData, setProfileContent }) => {

  // ? Section 1: Setting states
  // states for calculatinig the valuyes by month
  const [monthlyCalc1, setMonthlyCalc1] = useState()
  const [monthlyCalc2, setMonthlyCalc2] = useState()
  const [monthlyCalc3, setMonthlyCalc3] = useState()
  const [monthTotal, setMonthTotal] = useState()
  const [currentMonth, setCurrentMonth] = useState()
  const [currentMonthTotal, setCurrentMonthTotal] = useState()

  const [complete, setComplete] = useState(false)
  const [complete2, setComplete2] = useState(false)

  // states for determining the date of the month being selected
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).split('/').reverse().join('-')
  const [dateUsed, setDateUsed] = useState(formattedDate)


  // defiining a function for determinig whetheer a date is between two dates - used to identify the month in questoin
  function isDateBetween(startDate, endDate, dateToCheck) {
    return startDate <= dateToCheck && endDate >= dateToCheck
  }

  const [activeIndex, setActiveIndex] = useState(null)


  // state for handling the input data
  const [livingDetails, setLivingDetails] = useState()

  // update the living input data on first render witrh the selections added through the form
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('wittle-living-data'))
      if (data) setLivingDetails(data)
      console.log('living inputs ->', data)
      setLivingData({
        ...livingData,
        email_address: data.email_address,
        longitude: data.longitude,
        latitude: data.latitude,
        email_status: data.email_status,
        subscription_type: data.subscription_type,
        admin_status: data.admin_status,
        lifestyle_status: data.lifestyle_status,
        property_status: data.property_status,
        id: data.id,
        owner: data.owner,
      })
    } catch (err) {
      setLivingData(false)
    }
  }, [])


  useEffect(() => {
    if (livingDetails && livingDetails.admin_populated === 0) {
      setComplete2(true)
    }
  })

  // ? Section 2: Key calculatonis that structuree the dataset in a way that allows us to use it in the graphs as part of the recharts package
  // Step1 1: Edit the input data so we have the core values thatg have been inputted
  useEffect(() => {
    if (livingDetails && livingDetails.admin_populated === 1) {
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
          other_1: livingDetails.other_value_1,
          other_2: livingDetails.other_value_2,
          other_3: livingDetails.other_value_3,
          totals: {
            // essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value,
            // optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            // tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            // total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
          },
        }
      ]
      setMonthlyCalc1(calculation)
      console.log('admin monthly values ->', calculation)
    }
  }, [livingDetails])

  // define state for expanding the table rows
  const [tableRow, setTableRow] = useState({
    mortgage: 0,
    rent: 0,
    council: 0,
    energy: 0,
    electric: 0,
    gas: 0,
    broadband: 0,
    satellite: 0,
    netflix: 0,
    amazon: 0,
    disney: 0,
    apple: 0,
    tv_license: 0,
    phone: 0,
    gym: 0,
    other_1: 0,
    other_2: 0,
    other_3: 0,
  })


  // Step 2: Split the data out into individual objects for each month
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

  // Step 3: Define calculation that adds in additoinal information for each month
  const coreCalculation = () => {
    const calculation =
      [
        {
          ...monthlyCalc2[0],
          start_date: '2023-01-01',
          end_date: '2023-01-31',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[0].boiler + monthlyCalc2[0].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[0].boiler + monthlyCalc2[0].insurance,
          },
        },
        {
          ...monthlyCalc2[1],
          start_date: '2023-02-01',
          end_date: '2023-02-28',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[1].boiler + monthlyCalc2[1].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[1].boiler + monthlyCalc2[1].insurance,
          },
        },
        {
          ...monthlyCalc2[2],
          start_date: '2023-03-01',
          end_date: '2023-03-31',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[2].boiler + monthlyCalc2[2].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[2].boiler + monthlyCalc2[2].insurance,
          },
        },
        {
          ...monthlyCalc2[3],
          start_date: '2023-04-01',
          end_date: '2023-04-30',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[3].boiler + monthlyCalc2[3].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[3].boiler + monthlyCalc2[3].insurance,
          },
        },
        {
          ...monthlyCalc2[4],
          start_date: '2023-05-01',
          end_date: '2023-05-31',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[4].boiler + monthlyCalc2[4].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[4].boiler + monthlyCalc2[4].insurance,
          },
        },
        {
          ...monthlyCalc2[5],
          start_date: '2023-06-01',
          end_date: '2023-06-30',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[5].boiler + monthlyCalc2[5].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[5].boiler + monthlyCalc2[5].insurance,
          },
        },
        {
          ...monthlyCalc2[6],
          start_date: '2023-07-01',
          end_date: '2023-07-31',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[6].boiler + monthlyCalc2[6].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[6].boiler + monthlyCalc2[6].insurance,
          },
        },
        {
          ...monthlyCalc2[7],
          start_date: '2023-08-01',
          end_date: '2023-08-31',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[7].boiler + monthlyCalc2[7].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[7].boiler + monthlyCalc2[7].insurance,
          },
        },
        {
          ...monthlyCalc2[8],
          start_date: '2023-09-01',
          end_date: '2023-09-30',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[8].boiler + monthlyCalc2[8].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[8].boiler + monthlyCalc2[8].insurance,
          },
        },
        {
          ...monthlyCalc2[9],
          start_date: '2023-10-01',
          end_date: '2023-10-31',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[9].boiler + monthlyCalc2[9].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[9].boiler + monthlyCalc2[9].insurance,
          },
        },
        {
          ...monthlyCalc2[10],
          start_date: '2023-11-01',
          end_date: '2023-11-30',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[10].boiler + monthlyCalc2[10].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[10].boiler + monthlyCalc2[10].insurance,
          },
        },
        {
          ...monthlyCalc2[11],
          start_date: '2023-12-01',
          end_date: '2023-12-31',
          totals: {
            essential: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + monthlyCalc2[11].boiler + monthlyCalc2[11].insurance,
            optional: livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value,
            tv_total: livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value,
            total: livingDetails.mortgage_value + livingDetails.rent_value + livingDetails.council_tax_value + livingDetails.energy_value + livingDetails.electric_value + livingDetails.gas_value + livingDetails.tv_value + livingDetails.broadband_value + livingDetails.sky_value + livingDetails.netflix_value + livingDetails.amazon_value + livingDetails.disney_value + livingDetails.apple_value + livingDetails.phone_value + livingDetails.gym_value + monthlyCalc2[11].boiler + monthlyCalc2[11].insurance,
          },
        }
      ]
    setMonthlyCalc3(calculation)
    console.log('monthly totals 2 ->', calculation)
  }

  // Execute calculation
  useEffect(() => {
    if (monthlyCalc2) {
      coreCalculation()
    }
  }, [monthlyCalc2])

  // function for sorting through mixed string and values to add the highest values to the start of the array
  function mixedTypeSort(a, b) {
    // If a and b are both numbers, compare them directly
    if (typeof a === 'number' && typeof b === 'number') {
      return b - a
    }

    // If a is a number and b is not, a comes first
    if (typeof a === 'number') {
      return -1
    }

    // If b is a number and a is not, b comes first
    if (typeof b === 'number') {
      return 1
    }

    // If a and b are both strings, compare them lexicographically
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b)
    }

    // In all other cases, convert a and b to strings and compare them lexicographically
    return String(a).localeCompare(String(b))
  }

  // ? Section 3: Outline calculations that structures the data in the right way for us to use in the bar charts
  // filter data so that it onluy contains the current month selected
  useEffect(() => {
    if (monthlyCalc3) {
      const calculation = monthlyCalc3.filter(value => dateUsed <= value.end_date && dateUsed >= value.start_date)[0]
      const sortedArray = Object.values(calculation).sort(mixedTypeSort)
      const sortedObject = {}
      sortedArray.forEach(value => {
        // Get an array of keys associated with the current value
        const keys = Object.keys(calculation).filter((k) => calculation[k] === value)
        // Iterate through the keys array and add each key-value pair to the sortedObject
        keys.forEach((key) => {
          // Make sure the key has not already been added to the sortedObject
          // eslint-disable-next-line no-prototype-builtins
          if (!sortedObject.hasOwnProperty(key)) {
            sortedObject[key] = value
          }
        })
      })
      const totalValue = sortedObject.totals.total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 })
      setMonthTotal(sortedObject)
      setCurrentMonthTotal(totalValue)
    }
  }, [monthlyCalc3])

  // structure the data for the donut chart
  useEffect(() => {
    if (monthTotal) {
      const calculation =
        [
          {
            value: Object.values(monthTotal)[0],
          },
          {
            value: Object.values(monthTotal)[1],
          },
          {
            value: Object.values(monthTotal)[2],
          },
          {
            value: Object.values(monthTotal)[3],
          },
          {
            value: monthTotal.totals.total - Object.values(monthTotal)[3] - Object.values(monthTotal)[2] - Object.values(monthTotal)[1] - Object.values(monthTotal)[0],
          }
        ]
      setCurrentMonth(calculation)

      console.log('current month ->', calculation)
    }
  }, [monthTotal])

  // define a function that sets the month when you click a month in the bar chart
  const monthSetting = (payload, index) => {
    setDateUsed(payload.start_date)
    setActiveIndex(index)
    coreCalculation()
  }

  const CustomBar = ({ fill, active, ...props }) => {
    const fillColor = active ? 'red' : fill
    return <Bar fill={fillColor} {...props} />
  }

  // create an array of colours to be used in the donut chart
  const COLORS = ['#051885', 'rgba(5, 24, 133, 0.5)', 'rgba(255, 167, 229, 1)', 'rgba(255, 167, 229, 0.6)', 'rgba(255, 167, 229, 0.3)']


  const [livingData, setLivingData] = useState({
    admin_populated: 1,
    mortgage_status: 0,
    mortgage_provider: '',
    mortgage_value: 0,
    mortgage_date: null,
    nmortgage_notes: '',
    boiler_status: 0,
    boiler_provider: '',
    boiler_value: 0,
    boiler_date: null,
    boiler_noteS: '',
    insurance_status: 0,
    insurance_provider: '',
    insurance_value: 0,
    insurance_date: null,
    insurance_notes: '',
    energy_status: 0,
    energy_detail: 1,
    energy_provider: '',
    energy_value: 0,
    energy_date: null,
    energy_notes: '',
    gas_provider: '',
    gas_value: 0,
    gas_date: null,
    gas_notes: '',
    electric_provider: '',
    electric_value: 0,
    electric_date: null,
    electric_notes: '',
    council_tax_status: 0,
    council_tax_value: 0,
    council_tax_date: null,
    council_tax_notes: '',
    broadband_status: 0,
    broadband_provider: '',
    broadband_value: 0,
    broadband_date: null,
    broadband_notes: '',
    sky_status: 0,
    sky_provider: '',
    sky_value: 0,
    sky_date: null,
    sky_notes: '',
    netflix_status: 0,
    netflix_value: 0,
    netflix_date: null,
    netflix_notes: '',
    amazon_status: 0,
    amazon_value: 0,
    amazon_date: null,
    amazon_notes: '',
    disney_status: 0,
    disney_value: 0,
    disney_date: null,
    disney_notes: '',
    apple_status: 0,
    apple_value: 0,
    apple_date: null,
    apple_notes: '',
    tv_status: 0,
    tv_value: 0,
    tv_date: null,
    tv_notes: '',
    phone_status: 0,
    phone_provider: '',
    phone_value: 0,
    phone_date: null,
    phone_notes: '',
    gym_status: 0,
    gym_provider: '',
    gym_value: 0,
    gym_date: null,
    gym_notes: '',
    other_status_1: 0,
    other_type_1: '',
    other_provider_1: '',
    other_value_1: 0,
    other_date_1: null,
    other_notes_1: '',
    other_status_2: 0,
    other_type_2: '',
    other_provider_2: '',
    other_value_2: 0,
    other_date_2: null,
    other_notes_2: '',
    other_status_3: 0,
    other_type_3: '',
    other_provider_3: '',
    other_value_3: 0,
    other_date_3: null,
    other_notes_3: '',
  })



  // submit registration form
  const livingSubmit = async (e) => {
    // e.preventDefault()
    try {
      const { data } = await axios.put(`/api/living/edit/${parseInt(livingDetails.id)}`, livingData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      const storage = JSON.stringify(data)
      window.localStorage.setItem('wittle-living-data', storage)
      console.log('wittle living info ->', data)
      // navigate('/hub-temp')
      setComplete2(false)
      setComplete(true)
      // setProfileContent('Admin')
      setLivingDetails(data)
      // loadUserData()
    } catch (err) {
      // setErrors(err)
      console.log(err)
      console.log(err.response.data)
    }
  }






  // set state for showing wittle living signup
  const [livingRegisterShow, setLivingResgisterShow] = useState(false)

  // close modal
  const handleLivingRegisterClose = () => {
    setLivingResgisterShow(false)
    setComplete2(true)
  }

  // show living modal
  const handleLivingRegisterShow = () => {
    setLivingResgisterShow(true)
  }

  return (
    <>
      {livingDetails ?
        <div className='admin-portal'>
          {livingDetails.admin_populated === 0 || complete2 ?
            <LivingAdminInputs
              livingDetails={livingDetails}
              livingSubmit={livingSubmit}
              setLivingDetails={setLivingDetails}
              loadUserData={loadUserData}
              setProfileContent={setProfileContent}
              livingData={livingData}
              setLivingData={setLivingData}
            />
            : livingDetails.admin_populated === 1 || complete ?
              <>
                <div className='left-detail'>
                  <div className='admin-intro-section'>
                    <h1 className='admin-title'>Wittle Admin Portal</h1>
                    {/* <h3>Get insights and keep on top of your household bills in one place</h3> */}
                    {monthlyCalc3 ?
                      <div className='top-insights'>
                        <div className='insight'>
                          <h1><NumericFormat value={(monthlyCalc3[0].totals.total).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h1>
                          <p>Average monthly bills</p>
                        </div>
                        <div className='insight'>
                          <h1><NumericFormat value={(monthlyCalc3[0].totals.essential).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h1>
                          <p>Essential monthly bills</p>
                        </div>
                        <div className='insight'>
                          <h1><NumericFormat value={(monthlyCalc3[0].totals.optional).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h1>
                          <p>Optional monthly bills</p>
                        </div>
                      </div>
                      : ''}
                  </div>
                  <div className='admin-list-section'>
                    <div className='bills-table-title'>
                      <h1 className='admin-title'>Your bills</h1>
                      <button>Edit</button>

                    </div>
                    {livingDetails ?
                      <>
                        <div className='bills-table-headers'>
                          <div className='bills-row'>
                            <div className='bills-columns'>
                              <h3 className='column-1'>Item</h3>
                              <h3 className='column-2'>Cost (£)</h3>
                              <h3 className='column-3'>Day of spend</h3>
                              <h3 className='column-4'></h3>
                            </div>
                          </div>
                        </div>
                        <div className='bills-table-content'>
                          {livingDetails.mortgage_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🧾 Mortgage</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.mortgage_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.mortgage_date}</h3>
                                {tableRow ? tableRow.mortgage === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, mortgage: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, mortgage: 1 })}>^</h3> : ''}
                              </div>
                              {tableRow.mortgage === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.rent_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🧾 Rent</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.rent_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.rent_date}</h3>
                                {tableRow ? tableRow.rent === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, rent: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, rent: 1 })}>^</h3> : ''}
                                <h3></h3>

                              </div>
                              {tableRow.rent === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.insurance_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🏠 House insurance</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.insurance_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.insurance_date}</h3>
                                {tableRow ? tableRow.insurance === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, insurance: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, insurance: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.insurance === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.boiler_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🔧 Boiler maintenance</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.boiler_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.boiler_date}</h3>
                                {tableRow ? tableRow.boiler === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, boiler: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, boiler: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.boiler === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.council_tax_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🏛 Council Tax</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.council_tax_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.council_tax_date}</h3>
                                {tableRow ? tableRow.council === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, council: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, council: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.council === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.energy_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🔥 Energy</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.energy_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.energy_date}</h3>
                                {tableRow ? tableRow.energy === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, energy: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, energy: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.energy === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.gas_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>⛽️ Gas</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.gas_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.gas_date}</h3>
                                {tableRow ? tableRow.gas === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gas: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gas: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.gas === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.electric_value === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>💡 Electric</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.electric_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.electric_date}</h3>
                                {tableRow ? tableRow.electric === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, electric: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, electric: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.electric === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.broadband_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📶 Broadband</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.broadband_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.broadband_date}</h3>
                                {tableRow ? tableRow.council === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, council: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, council: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.council === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.sky_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📺 Satelite TV</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.sky_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.sky_date}</h3>
                                {tableRow ? tableRow.satellite === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, satellite: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, satellite: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.satellite === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.netflix_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>💻 Netflix</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.netflix_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.netflix_date}</h3>
                                {tableRow ? tableRow.netflix === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, netflix: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, netflix: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.netflix === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.amazon_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📦 Amazon</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.amazon_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.amazon_date}</h3>
                                {tableRow ? tableRow.amazon === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, amazon: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, amazon: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.amazon === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.disney_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🦄 Disney</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.disney_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.disney_date}</h3>
                                {tableRow ? tableRow.disney === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, disney: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, disney: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.disney === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.apple_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🍏 Apple TV</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.apple_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.apple_date}</h3>
                                {tableRow ? tableRow.apple === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, apple: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, apple: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.apple === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.tv_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📺 TV license</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.tv_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.tv_date}</h3>
                                {tableRow ? tableRow.tv_license === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, tv_license: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, tv_license: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.tv_license === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.phone_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📱 Phone contract</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.phone_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.phone_date}</h3>
                                {tableRow ? tableRow.phone === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, phone: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, phone: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.phone === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.gym_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🏋️‍♂️ Gym</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.gym_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.gym_date}</h3>
                                {tableRow ? tableRow.gym === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gym: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gym: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.gym === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.other_status_1 === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>{livingDetails.other_type_1}</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.other_value_1} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.other_date_1}</h3>
                                {tableRow ? tableRow.other_1 === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_1: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_1: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.other_1 === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.other_status_2 === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>{livingDetails.other_type_2}</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.other_value_2} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.other_date_2}</h3>
                                {tableRow ? tableRow.other_2 === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_2: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_2: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.other_2 === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.other_status_3 === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>{livingDetails.other_type_3}</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.other_value_3} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.other_date_3}</h3>
                                <h3 className='column-4'>See notes</h3>
                                <h3></h3>
                              </div>
                              <div className='bills-notes'>
                              </div>
                            </div>
                            : ''}
                        </div>
                      </>
                      : ''
                    }
                  </div>
                </div>
                <div className='right-detail'>
                  <div className='bar-section'>
                    <h1 className='admin-title'>Yearly spend by month</h1>
                    {/* <ResponsiveContainer width="100%" height="100%"> */}
                    <div className='bar-wrapper'>
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
                          <XAxis fontSize={'0.7rem'} fontFamily={'poppins'} dataKey='month' />
                          <YAxis fontSize={'0.7rem'} fontFamily={'poppins'} dataKey='totals.total' />
                          <Tooltip
                            formatter={(value, name, props) => {
                              const formatter = new Intl.NumberFormat('en-GB', {
                                style: 'currency',
                                currency: 'GBP',
                                minimumFractionDigits: 0,
                              })
                              return [`Spend: ${formatter.format(value)}`]
                            }}
                            labelFormatter={(label) => {
                              return `${label}`
                            }}
                          />
                          {/* <Bar dataKey="totals.total" fill={this.activeLabel === dateUsed ? '#82ca9d' : '#8884d8'} onClick={monthSetting} style={{ cursor: 'pointer' }} width={30} /> */}
                          <Bar dataKey="totals.total" label={false} fill="#051885" onClick={monthSetting} style={{ cursor: 'pointer' }} barSize={20} />
                          {/* <Bar dataKey="totals.total" fill="#051885" barSize={30} shape={<CustomBar active={activeIndex === 0} />}  onClick={monthSetting} /> */}

                        </BarChart>
                        : ''}
                    </div>
                    {/* </ResponsiveContainer> */}
                  </div>
                  <div className='donut-section'>
                    <h1 className='admin-title'>Spend in {monthTotal ? monthTotal.month : ''}</h1>

                    <div className='donut-box'>
                      <div className='donut-detail'>
                        {currentMonth ?
                          <>
                            <div className='desktop-donut'>
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
                                  <Label value={`${currentMonthTotal}`} display='text' thousandSeparator={true} position='center' />
                                </Pie>
                              </PieChart>
                            </div>
                            <div className='mobile-donut'>
                              <PieChart width={180} height={200}>
                                <Pie
                                  data={currentMonth}
                                  cx={80}
                                  cy={100}
                                  innerRadius={50}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  paddingAngle={2}
                                  dataKey="value"
                                  margin={{ left: 5 }}
                                >
                                  {currentMonth.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                  <Label value={`${currentMonthTotal}`} display='text' thousandSeparator={true} position='center' />
                                </Pie>
                              </PieChart>
                            </div>
                          </>
                          : ''}
                      </div>
                      {monthTotal && currentMonth ?
                        <div className='donut-content'>
                          <div className='legend-row'>
                            <div className='legend-box' id='one'></div>
                            <h3>{Object.keys(monthTotal)[0].charAt(0).toUpperCase() + Object.keys(monthTotal)[0].slice(1)}: <NumericFormat value={(currentMonth[0].value).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                          </div>
                          <div className='legend-row'>
                            <div className='legend-box' id='two'></div>
                            <h3>{Object.keys(monthTotal)[1].charAt(0).toUpperCase() + Object.keys(monthTotal)[1].slice(1)}: <NumericFormat value={(currentMonth[1].value).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>

                          </div>
                          <div className='legend-row'>
                            <div className='legend-box' id='three'></div>
                            <h3>{Object.keys(monthTotal)[2].charAt(0).toUpperCase() + Object.keys(monthTotal)[2].slice(1)}: <NumericFormat value={(currentMonth[2].value).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                          </div>
                          <div className='legend-row'>
                            <div className='legend-box' id='four'></div>
                            <h3>{Object.keys(monthTotal)[3].charAt(0).toUpperCase() + Object.keys(monthTotal)[3].slice(1)}: <NumericFormat value={(currentMonth[3].value).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                          </div>
                          <div className='legend-row'>
                            <div className='legend-box' id='five'></div>
                            <h3>Other: <NumericFormat value={(currentMonth[4].value).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                          </div>
                        </div>
                        : ''}
                    </div>

                  </div>
                </div>
                <div className='bottom-detail'>
                  <div className='admin-list-section'>
                    <div className='bills-table-title'>
                      <h1 className='admin-title'>Your bills</h1>
                      <button>Edit</button>

                    </div>
                    {livingDetails ?
                      <>
                        <div className='bills-table-headers'>
                          <div className='bills-row'>
                            <div className='bills-columns'>
                              <h3 className='column-1'>Item</h3>
                              <h3 className='column-2'>Cost (£)</h3>
                              <h3 className='column-3'>Day of spend</h3>
                              <h3 className='column-4'></h3>
                            </div>
                          </div>
                        </div>
                        <div className='bills-table-content'>
                          {livingDetails.mortgage_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🧾 Mortgage</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.mortgage_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.mortgage_date}</h3>
                                {tableRow ? tableRow.mortgage === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, mortgage: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, mortgage: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.mortgage === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.rent_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🧾 Rent</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.rent_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.rent_date}</h3>
                                {tableRow ? tableRow.rent === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, rent: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, rent: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.rent === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.insurance_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🏠 House insurance</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.insurance_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.insurance_date}</h3>
                                {tableRow ? tableRow.insurance === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, insurance: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, insurance: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.insurance === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.boiler_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🔧 Boiler maintenance</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.boiler_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.boiler_date}</h3>
                                {tableRow ? tableRow.boiler === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, boiler: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, boiler: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.boiler === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.council_tax_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🏛 Council Tax</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.council_tax_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.council_tax_date}</h3>
                                {tableRow ? tableRow.council === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, council: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, council: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.council === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.energy_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🔥 Energy</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.energy_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.energy_date}</h3>
                                {tableRow ? tableRow.energy === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, energy: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, energy: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.energy === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.gas_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>⛽️ Gas</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.gas_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.gas_date}</h3>
                                {tableRow ? tableRow.gas === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gas: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gas: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.gas === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.electric_value === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>💡 Electric</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.electric_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.electric_date}</h3>
                                {tableRow ? tableRow.electric === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, electric: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, electric: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.electric === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.broadband_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📶 Broadband</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.broadband_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.broadband_date}</h3>
                                {tableRow ? tableRow.broadband === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, broadband: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, broadband: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.broadband === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.sky_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📺 Satelite TV</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.sky_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.sky_date}</h3>
                                {tableRow ? tableRow.satellite === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, satellite: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, satellite: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.satellite === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.netflix_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>💻 Netflix</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.netflix_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.netflix_date}</h3>
                                {tableRow ? tableRow.netflix === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, netflix: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, netflix: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.netflix === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.amazon_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📦 Amazon</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.amazon_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.amazon_date}</h3>
                                {tableRow ? tableRow.amazon === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, amazon: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, amazon: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.amazon === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.disney_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🦄 Disney</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.disney_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.disney_date}</h3>
                                {tableRow ? tableRow.disney === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, disney: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, disney: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.disney === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.apple_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🍏 Apple TV</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.apple_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.apple_date}</h3>
                                {tableRow ? tableRow.apple === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, apple: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, apple: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.apple === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.tv_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📺 TV license</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.tv_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.tv_date}</h3>
                                {tableRow ? tableRow.tv_license === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, tv_license: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, tv_license: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.tv_license === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.phone_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>📱 Phone contract</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.phone_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.phone_date}</h3>
                                {tableRow ? tableRow.phone === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, phone: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, phone: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.phone === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.gym_status === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>🏋️‍♂️ Gym</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.gym_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.gym_date}</h3>
                                {tableRow ? tableRow.gym === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gym: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gym: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.gym === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.other_status_1 === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>{livingDetails.other_type_1}</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.other_value_1} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.other_date_1}</h3>
                                {tableRow ? tableRow.other_1 === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_1: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_1: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.other_1 === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.other_status_2 === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>{livingDetails.other_type_2}</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.other_value_2} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.other_date_2}</h3>
                                {tableRow ? tableRow.other_2 === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_2: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_2: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.other_2 === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                          {livingDetails.other_status_3 === 1 ?
                            <div className='bills-row'>
                              <div className='bills-columns'>
                                <h3 className='column-1'>{livingDetails.other_type_3}</h3>
                                <h3 className='column-2'><NumericFormat value={livingDetails.other_value_3} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                                <h3 className='column-3'>{livingDetails.other_date_3}</h3>
                                {tableRow ? tableRow.other_3 === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_3: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_3: 1 })}>^</h3> : ''}
                                <h3></h3>
                              </div>
                              {tableRow.other_3 === 1 ?
                                <>
                                  <hr className='notes-divider' />
                                  <div className='bills-notes'>
                                    <div className='notes-details'>
                                      <h4>Notes</h4>

                                    </div>
                                    <div className='actions'>
                                      <h4>Actions</h4>
                                      <h3>Close account</h3>
                                      <h3>Change bill date</h3>
                                      <h3>Edit input</h3>
                                    </div>
                                  </div>
                                </>
                                : ''
                              }
                            </div>
                            : ''}
                        </div>
                      </>
                      : ''
                    }
                  </div>
                </div>
              </>
              : ''
          }
        </div>
        :
        <div className='admin-portal-no-account'>
          <div className='no-account-left'>
            <h1>To unlock the Wittle Admin dashboard, you need to finalise some account details</h1>
            <button onClick={handleLivingRegisterShow}>Finish set up</button>
            <LivingSignup
              livingRegisterShow={livingRegisterShow}
              handleLivingRegisterClose={handleLivingRegisterClose}
              loadUserData={loadUserData}
              setComplete2={setComplete2}
            />
          </div>
          <div className='no-account-right'>
            <div className='living-admin-image'></div>
          </div>

        </div>
        // : ''
      }
    </>
  )
}

export default ProfileAdmin