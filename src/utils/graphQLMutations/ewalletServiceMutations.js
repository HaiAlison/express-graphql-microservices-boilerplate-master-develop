import gql from 'graphql-tag';

export const makePayOutTransaction = gql`
	mutation CreateWithdrawalTransaction($inputData: WithdrawalTransactionInput!){
		createWithdrawalTransaction(inputData: $inputData){
			success
			payload{
				id
				orderId
			}
		}
	}
`;
