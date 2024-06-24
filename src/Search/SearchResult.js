import React, { useState } from 'react';

/**
 * SearchResult Component
 * 
 * Displays search results in a table format and allows address selection.
 *
 * Props:
 * - results (Array): Search result objects to display.
 * - onSelectAddress (Function): Callback to handle address selection.
 * - searchInitiated (Boolean): Indicates if the search has been initiated.
 *
 * Shows "No results found" if no results are returned.
 */
const SearchResult = ({ results, onSelectAddress, searchInitiated, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Calculate the number of pages
  const totalPages = Math.ceil(results.length / itemsPerPage);

  // Get the current page's results
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  // Handle page change and scroll to top
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to the top of the page on a click
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  if (loading) {
    return <p>Loading Results...</p>;
  }

  if (searchInitiated && (!results || results.length === 0)) {
    return <p>No results found.</p>;
  }

  // Group fields based on attribute type
  const getGroupedValue = (result, fields) => {
    for (let field of fields) {
      if (result[field]) {
        return result[field];
      }
    }
    return '';
  };

  // Combine fields if both are present, otherwise just return the first found
  const getCombinedOrSingleValue = (result, fields) => {
    const values = fields.map(field => result[field]).filter(val => val);
    return values.join(' - '); // Combine with a slash if both are present
  };

  const hasAddressLine2 = currentResults.some(result => result.addressLine2 || result.house_number || result.neighborhood || result.district);
  const hasProvince = currentResults.some(result => result.provinceCode || result.province || result.prefecture || result.state);

  return (
    <div className="search-results">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th title="Address Line 1 or Street Name">Address Line 1</th>
            {hasAddressLine2 && <th title="Address Line 2 or House Number or Neighborhood">Address Line 2/Locality</th>}
            <th>City/Town</th>
            {hasProvince && <th>Prefecture/Province/State</th>}
            <th>Country</th>
            <th>Zip/Postal Code</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result, index) => (
            <tr key={index}>
              <td>{result.name || ''}</td>
              <td>{getGroupedValue(result, ['address', 'addressLine1', 'street_name'])}</td>
              {hasAddressLine2 ? (
                <td className="search-addressLine2">{getGroupedValue(result, ['addressLine2', 'house_number', 'neighborhood', 'district'])}</td>
              ) : (
                hasAddressLine2 && <td></td>
              )}
              <td className="search-city">{result.city || ''}</td>
              {hasProvince ? (
                <td className="search-state">{getCombinedOrSingleValue(result, ['province', 'provinceCode', 'state', 'prefecture'])}</td>
              ) : (
                hasProvince && <td></td>
              )}
              <td className="search-country">{result.country || ''}</td>
              <td className="search-postal">{getGroupedValue(result, ['zipCode', 'postalZip', 'postalCode', 'postalcode', 'postal_code'])}</td>
              <td className="table-button">
                <button className="select-button" onClick={() => onSelectAddress(result)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default SearchResult;




