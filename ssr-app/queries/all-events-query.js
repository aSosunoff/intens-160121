import {gql} from '@apollo/client'

export const allEventsQuery = gql`
    query {
        allEvents {
            id
            title
        }
    }
`
