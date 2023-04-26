import React, { useState, useEffect, useRef } from 'react'
import { NumericFormat } from 'react-number-format'
import ReactPaginate from 'react-paginate'



const TableView = ({ masterLiving3, variableValue, mapSelect, setLifestyleView, column2Title, column3Title, column4Title,
  column2Detail, column3Detail, column4Detail, startIndex, endIndex, handlePageClick }) => {



  return (
    <>
      <div className='table-content'>
        {masterLiving3.map((city, index) => {
          return (
            <>
              <div className='sub-title'>
                <h1 key={index}><NumericFormat value={city[variableValue].length} displayType={'text'} thousandSeparator={true} /> {variableValue}</h1>
                <div className='icon-selector-section'>
                  <div className='icon-selector'>
                    <div className='map-icon' id='map-icon' onClick={mapSelect} ></div>
                  </div>
                  <div className='icon-selector'>
                    <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
        <div className='table-titles'>
          <h5 className='column-1'>#</h5>
          <h5 className='column-2'>{column2Title}</h5>
          {variableValue === 'gyms' || variableValue === 'pubs' ? <h5 className='column-3' id='gym-option'>{column3Title}</h5> : variableValue === 'primaries' || variableValue === 'secondaries' || variableValue === 'colleges' ? '' : <h5 className='column-3'>{column3Title}</h5>}
          {variableValue === 'gyms' || variableValue === 'pubs' ? '' : variableValue === 'primaries' || variableValue === 'secondaries' || variableValue === 'colleges' ? <h5 className='column-4' id='school-option'>{column4Title}</h5> : <h5 className='column-4'>{column4Title}</h5>}
          {/* <h5 className='column-5'>Distance (mins)</h5> */}
          {/* <h5 className='column-6'>Contact</h5> */}
        </div>
        {
          masterLiving3.map((item, index) => {
            return (
              <div className='table-details-wrap' key={index}>
                {item[variableValue].map((item, index) => {
                  return (
                    <>
                      <div className='table-details' key={index}>
                        <h5 className='column-1'>{index + 1}</h5>
                        <h5 className='column-2'>{item[column2Detail]}</h5>
                        {variableValue === 'gyms' || variableValue === 'pubs' ? <h5 className='column-3' id='gym-option'>{item[column3Detail]}</h5> : variableValue === 'primaries' || variableValue === 'secondaries' || variableValue === 'colleges' ? '' : <h5 className='column-3'>{item[column3Detail]}</h5>}
                        {variableValue === 'gyms' || variableValue === 'pubs' ? '' : variableValue === 'primaries' || variableValue === 'secondaries' || variableValue === 'colleges' ? <h5 className='column-4' id='school-option'>{item[column4Detail]}</h5> : <h5 className='column-4'>{item[column4Detail]}</h5>}
                        {/* <h5 className='column-5'>{item.distance_walk_mins}</h5> */}
                        {/* <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5> */}
                      </div>
                    </>
                  )
                }).slice(startIndex, endIndex)}
                <ReactPaginate
                  pageCount={Math.ceil(item[variableValue].length / 50)}
                  onPageChange={handlePageClick}
                  containerClassName={'pagination'}
                  activeClassName={'active'}
                  previousLabel={'<'}
                  nextLabel={'>'}
                  pageRangeDisplayed={0}
                  breakLabel={'...'}
                />
              </div>
            )
          })
        }

      </div>
    </>
  )
}

export default TableView