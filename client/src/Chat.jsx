import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
    useQuery
} from '@apollo/client'
import { Container } from 'shards-react'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
})

const GET_MESSAGES = gql`
    query {
        messages {
            id
            content
            user
        }
    }
`

const Messages = ({ user }) => {
    const { data } = useQuery(GET_MESSAGES)
    // console.log(data)
    if (!data) {
        return null
    }
    // return JSON.stringify(data)
    return (
        <>
            {data.messages.map(({ id, user: messageUser, content }) => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent:
                            user === messageUser ? 'flex-end' : 'flex-start',
                        paddingBottom: '1rem'
                    }}
                >
                    {user !== messageUser && (
                        <div
                            style={{
                                height: 50,
                                width: 50,
                                marginRight: '0.5em',
                                border: '2px solid #e5e6ea',
                                borderRadius: 25,
                                textAlign: 'center',
                                fontSize: '18px',
                                paddingTop: 10
                            }}
                        >
                            {messageUser.slice(0, 2).toUpperCase()}
                        </div>
                    )}
                    <div
                        style={{
                            background:
                                user === messageUser ? '#58bf56' : '#e5e6ea',
                            color: user === messageUser ? 'white' : 'black',
                            padding: '1em',
                            borderRadius: '1em',
                            maxWidth: '60%'
                        }}
                    >
                        {content}
                    </div>
                </div>
            ))}
        </>
    )
}

const Chat = () => {
    return (
        <div>
            <Messages user="Jack" />
        </div>
    )
}

export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
)
