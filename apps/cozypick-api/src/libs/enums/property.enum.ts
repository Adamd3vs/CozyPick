import { registerEnumType } from '@nestjs/graphql';

export enum PropertyType {
	  HOTELS = 'HOTELS',
  HANOK_STAY = 'HANOK_STAY',
  MOTEL = 'HOSTEL',
  MOUNTAIN = 'MOUNTAIN',
  BEACH = 'BEACH',
  ISLAND = 'ISLAND',
  LAKE = 'LAKE',
  PALACE = 'PALACE',
  TEMPLE = 'TEMPLE',
  MUSEUM = 'MUSEUM',
  ART_GALLERY = 'ART_GALLERY',
  COFFEE = 'COFFEE',
  MARKET = 'MARKET',
  THEME_PARK = 'THEME_PARK',
  AQUARIUM = 'AQUARIUM',
  OUTLET_MALL = 'OUTLET_MALL',
  FESTIVAL = 'FESTIVAL',
}
registerEnumType(PropertyType, {
	name: 'PropertyType',
});

export enum PropertyStatus {
	ACTIVE = 'ACTIVE',
	CLOSED = 'CLOSED',
	DELETE = 'DELETE',
}
registerEnumType(PropertyStatus, {
	name: 'PropertyStatus',
});

export enum PropertyLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	CHONJU = 'CHONJU',
	DAEJON = 'DAEJON',
	JEJU = 'JEJU',
}
registerEnumType(PropertyLocation, {
	name: 'PropertyLocation',
});
