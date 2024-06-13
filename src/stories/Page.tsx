import React from 'react'

import { Header } from '@/components/header'

type User = {
  name: string
}

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>()

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />

      <section className="text-[14px] leading-[24px] py-[48px] px-[20px] my-0 mx-[auto] max-w-[600px] text-[#333]">
        <h2 className="font-[700] text-[32px] leading-normal my-0 mr-0 ml-[4px] inline-block align-top">
          Pages in Storybook
        </h2>
        <p className="my-[1em] mx-0">
          We recommend building UIs with a{' '}
          <a
            className="no-underline text-[#1ea7fd]"
            href="https://componentdriven.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>component-driven</strong>
          </a>{' '}
          process starting with atomic components and ending with pages.
        </p>
        <p className="my-[1em] mx-0">
          Render pages with mock data. This makes it easy to build and review
          page states without needing to navigate to them in your app. Here are
          some handy patterns for managing page data in Storybook:
        </p>
        <ul className="pl-[30px] my-[1em] mx-0">
          <li className="mb-[8px]">
            Use a higher-level connected component. Storybook helps you compose
            such data from the &quot;args&quot; of child component stories
          </li>
          <li className="mb-[8px]">
            Assemble data in the page component from your services. You can mock
            these services out using Storybook.
          </li>
        </ul>
        <p className="my-[1em] mx-0">
          Get a guided tutorial on component-driven development at{' '}
          <a
            className="no-underline text-[#1ea7fd]"
            href="https://storybook.js.org/tutorials/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Storybook tutorials
          </a>
          . Read more in the{' '}
          <a
            className="no-underline text-[#1ea7fd]"
            href="https://storybook.js.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            docs
          </a>
          .
        </p>
        <div className="text-[13px] leading-[20px] mt-[40px] mb-[40px]">
          <span className="inline-block rounded-[1em] text-[11px] leading-[12px] font-[700] bg-[#e7fdd8] text-[#66bf3c] py-[4px] px-[12px] mr-[10px] align-top">
            Tip
          </span>{' '}
          Adjust the width of the canvas with the{' '}
          <svg
            className="inline-block h-[12px] w-[12px] mr-[4px] align-top mt-[3px]"
            width="10"
            height="10"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
                id="a"
                fill="#1ea7fd"
              />
            </g>
          </svg>
          Viewports addon in the toolbar
        </div>
      </section>
    </article>
  )
}
