/// <reference path="index.d.ts" />
declare namespace kakao.maps {
  /**
   * @see [LatLngBounds](http://apis.map.kakao.com/web/documentation/#LatLngBounds)
   */
  export class LatLngBounds {
    /**
     * WGS84 좌표계에서 사각영역 정보를 표현하는 객체를 생성한다.
     *
     * @param sw 사각 영역에서 남서쪽 좌표
     * @param ne 사각 영역에서 북동쪽 좌표
     */
    constructor(sw?: LatLng, ne?: LatLng)

    /**
     * 객체가 가지고 있는 영역 정보와 같은 영역 정보를 가지고 있는 객체인지 비교한다.
     *
     * @param latlng
     */
    public equals(latlngBounds: LatLngBounds): boolean

    /**
     * 객체가 가지고 있는 영역 정보를 문자열로 반환한다.
     */
    public toString(): string

    /**
     * 영역 정보가 비어있는지 확인한다.
     */
    public isEmpty(): boolean

    /**
     * 영역의 남서쪽 좌표를 반환한다.
     */
    public getSouthWest(): LatLng

    /**
     * 영역의 북동쪽 좌표를 반환한다.
     */
    public getNorthEast(): LatLng

    /**
     * 인수로 주어진 좌표를 포함하도록 영역 정보를 확장한다.
     *
     * @param latlng
     */
    public extend(latlng: LatLng): void

    /**
     * 영역 객체가 인수로 주어진 좌표를 포함하는지 확인한다.
     *
     * @param latlng
     */
    public contain(latlng: LatLng): boolean
  }
}
