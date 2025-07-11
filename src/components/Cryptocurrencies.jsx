import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  //getting first 20 crypto coins
  const count = simplified ? 20 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  // getting all the coins info
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // setCryptos(cryptosList?.data?.coins)

    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  console.log(cryptos);
  if (isFetching) return "Loading...";
  return (
    <>
      {/* hide the search bar from home page and show it in cryptocurrencies page */}
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank} . ${currency.name}`}
               
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="iconUrl"
                  />
                }
                hoverable
              >
                <p>price: {millify(currency.price)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
