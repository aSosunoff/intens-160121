import {gql} from '@apollo/client'

export const renameMutation = gql`
    mutation RenameMutation($id: ID!, $title: String!) {
        renameEvent(id: $id, title: $title) {
            id
            title
        }
    }
`
