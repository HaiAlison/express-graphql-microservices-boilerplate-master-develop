import gql from 'graphql-tag';

export const createRealEstateForExternal = gql`
mutation createRealEstateForExternal($data: RealEstateExternalInputType!){
	createRealEstateForExternal(data: $data){
	    id,
		type, isForSell, company, service, 
            houseNumber, 
            hasAlley, 
            alleyTurnCount,
            timeForRent, 
            timeForRentUnit, 
            frontHomeAlleyWidth,
            isNewConstruction, 
            width, 
            length, 
            rear, 
            area, 
            floorCount, 
            price,
            priceUnit, 
            bedroomCount, 
            project, 
            toiletCount, 
            buildingType, 
            warehouseType, 
            warehouseRoomCount,
            block,
            onFloor, investor, bedRoomArea, roomNumber, shophouseField, roomArea, hasMezzanine, motelName,
            direction, postTitle, postContent, privateNote,
            legals, contactName, contactPhone1,
            contactPhone2, contactEmail, villaView, hotelStar, roomCount, hasSeaView,
            postType,fixedUtilities, utilities, localUtilities, equipmentsAndServices, numberOfPostingDay,
	}
}
`;
