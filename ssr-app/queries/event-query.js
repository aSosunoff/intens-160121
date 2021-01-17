import {gql} from '@apollo/client'

export const eventQuery = gql`
    query EventQuery($id_var: String!) {
        event(id: $id_var) {
            id
            url
            people {
                id
                firstName
            }
        }
    }
`
