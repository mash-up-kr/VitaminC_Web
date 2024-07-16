/// <reference path="index.d.ts" />
declare namespace kakao.maps {
  /**
   * @see [MarkerImage](http://apis.map.kakao.com/web/documentation/#MarkerImage)
   */
  export class MarkerImage {
    /**
     * 마커에 사용할 이미지를 생성한다.
     * 세 번째 파라메터로 offset을 사용할 경우 네 번째 파라메터로 shape, 다섯 번째 파라메터로 coords를 넣을 수 있다.
     *
     * @param src 이미지 주소
     * @param size 마커의 크기
     * @param options
     */
    constructor(src: string, size: Size, options?: MarkerImageOptions)
  }

  export interface MarkerImageOptions {
    /**
     * 마커 이미지의 alt 속성값을 정의한다.
     */
    alt?: string

    /**
     * 마커의 클릭 또는 마우스오버 가능한 영역을 표현하는 좌표값
     */
    coords?: string

    /**
     * 마커의 좌표에 일치시킬 이미지 안의 좌표 (기본값: 이미지의 가운데 아래)
     */
    offset?: Point

    /**
     * 마커의 클릭 또는 마우스오버 가능한 영역의 모양
     */
    shape?: 'default' | 'rect' | 'circle' | 'poly'

    /**
     * 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
     */
    spriteOrigin?: Point

    /**
     * 스프라이트 이미지의 전체 크기
     */
    spriteSize?: Size
  }
}
