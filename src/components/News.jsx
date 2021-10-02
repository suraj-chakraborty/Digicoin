import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;

const { Option } = Select;

const demoImage = "https://images.unsplash.com/photo-1627454822466-0b05090cb737?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNyeXB0b2N1cnJlbmN5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=60"

const News = ({simplified}) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 9 : 200 })
    const { data } = useGetCryptosQuery(200)


    if(!cryptoNews?.value) return 'Loading...'

    return (
        <Row gutter={[ 24, 24]}>
            {!simplified && (
                 <Col span={24}>
                     <Select 
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                     >
                         <Option value="Cryptocurrency"></Option>
                         {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                     </Select>
                </Col>
            )}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>
                                    {news.name}
                                </Title>
                                    {/* //image for the news cards */}
                                    <img style={{ maxWidth: '200px', maxHeight: '100px', borderRadius: '0.7em' }} src={news?.image?.thumbnail?.contentUrl|| demoImage} alt="news" />
                            </div>
                            <p>
                                {news.description > 50 ? '${news.description.substring(0, 50,)}...'
                                : news.description}
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0] ?.image?.thumbnail?.contentUrl || demoImage } alt="news" />
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.dataPublished).startOf("SS").fromNow()}</Text>

                            </div>
                        </a>
                    </Card>
                </Col>
            ))}

        </Row>
    )
}

export default News
