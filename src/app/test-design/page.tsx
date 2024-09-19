'use client'

import Typography from '@/components/common/typography'

const TestDesign = () => {
  return (
    <>
      <div className="flex h-dvh w-dvw flex-col gap-[40px]">
        <Typography size="body0" color="neutral-000">
          BODY0
        </Typography>
        <Typography size="body0-2" color="neutral-000">
          BODY0-2
        </Typography>
        <Typography size="body1" color="neutral-000">
          BODY1
        </Typography>
        <Typography size="body2" color="neutral-000">
          BODY2
        </Typography>
        <Typography size="body3" color="neutral-000">
          BODY3
        </Typography>
        <Typography size="body4" color="neutral-000">
          BODY4
        </Typography>
        <Typography size="h0" color="neutral-000">
          H0
        </Typography>
        <Typography size="h1" color="neutral-000">
          h1
        </Typography>
        <Typography size="h2" color="neutral-000">
          h2
        </Typography>
        <Typography size="h3" color="neutral-000">
          h3
        </Typography>
        <Typography size="h4" color="neutral-000">
          h4
        </Typography>
        <Typography size="h5" color="neutral-000">
          h5
        </Typography>
        <Typography size="h5-2" color="neutral-000">
          h5-2
        </Typography>
        <Typography size="h6" color="neutral-000">
          h6
        </Typography>
        <Typography size="h7" color="neutral-000">
          h7
        </Typography>
      </div>
    </>
  )
}

export default TestDesign
