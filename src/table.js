import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&offset=${offset+20}`);
      const data = await response.json();
      setCities(prevCities => [...prevCities, ...data.results]);
      setOffset(prevOffset => prevOffset + 20);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      console.log('User has scrolled to the bottom');
      if (!loading) {
        // Avoid fetching more data if already loading
        fetchData();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th>City Name</th>
          <th>Country</th>
          <th>Timezone</th>
        </tr>
      </thead>
      <tbody>
        {cities.map(city => (
          <tr key={city.geoname_id}>
            <td>
              <Link to={`/city/?name=${city.name}`}>
                {city.name}
              </Link>
            </td>
            <td>{city.cou_name_en}</td>
            <td>{city.timezone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CityTable;
