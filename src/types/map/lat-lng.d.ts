/// <reference path="index.d.ts" />
declare namespace kakao.maps {
  /**
   * @see [LatLng](http://apis.map.kakao.com/web/documentation/#LatLng)
   */
  export class LatLng {
    /**
     * WGS84 좌표 정보를 가지고 있는 객체를 생성한다.
     *
     * @param latitude 위도
     * @param longitude 경도
     */
    constructor(latitude: number, longitude: number)

    /**
     * 위도를 반환한다.
     */
    public getLat(): number

    /**
     * 경도를 반환한다.
     */
    public getLng(): number

    /**
     * 객체가 가지고 있는 좌표와 같은 좌표를 가지고 있는 객체인지 비교한다.
     *
     * @param latlng
     */
    public equals(latlng: LatLng): boolean

    /**
     * 객체가 가지고 있는 좌표를 문자열로 반환한다.
     */
    public toString(): string

    /**
     * 객체가 가지고 있는 좌표를 Wcongnamul 좌표로 반환한다.
     */
    public toCoords(): Coords
  }
}
