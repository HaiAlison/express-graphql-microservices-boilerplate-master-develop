import gql from 'graphql-tag';

export const makeNotificationsToUsers = gql`
	mutation createNotification($title: title!, $body: body!, $toUsers: toUsers!, $type: type!, $status: status, $requestedUser: requestedUser, $transaction: transaction){
		createNotification(title: $title, body: $body, toUsers: $toUsers, type: $type, status: $status, requestedUser: $requestedUser, transaction: $transaction){
			success
			payload{
				id,
                toUser,
                isRead,
                notificationId,
			}
		}
	}
`;

