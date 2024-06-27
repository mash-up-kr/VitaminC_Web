/// <reference path="index.d.ts" />
declare namespace kakao.maps {
  /**
   * v3 스크립트를 동적으로 로드하기위해 사용한다.
   * 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
   * 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
   * 비동기 통신으로 페이지에 v3를 동적으로 삽입할 경우에 주로 사용된다.
   * v3 로딩 스크립트 주소에 파라메터로 autoload=false 를 지정해 주어야 한다.
   */
  export function load(callback: () => void): void

  /**
   * 고해상도 기기에서 HD 타일을 기본 타일로 사용하지 않도록 한다.
   * 모바일용 로드뷰도 고화질이 아닌 일반화질로 노출된다.
   * 반드시 Map 혹은 Roadview 객체를 선언하기 전에 호출해야 한다.
   *
   * @see [disableHD](http://apis.map.kakao.com/web/documentation/#disableHD)
   */
  export function disableHD(): void
}
