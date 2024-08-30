/// <reference path="index.d.ts" />
declare namespace kakao.maps {
  /**
   * @see [Size](http://apis.map.kakao.com/web/documentation/#Size)
   */
  export class Size {
    /**
     * 크기 정보를 담고 있는 사이즈 객체를 생성한다.
     *
     * @param width
     * @param height
     */
    constructor(width: number, height: number)

    /**
     * 사이즈 객체가 가지고 있는 크기와 같은 크기를 가지고 있는 객체인지 비교한다.
     *
     * @param size
     */
    public equals(size: Size): boolean

    /**
     * 사이즈 객체가 가지고 있는 크기를 문자열로 반환한다.
     */
    public toString(): string
  }
}
