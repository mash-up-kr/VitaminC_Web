'use client'

import Typography from '@/components/common/typography'

const TestDesign = () => {
  return (
    <>
      <div className="flex h-dvh w-dvw flex-col gap-[40px]">
        <Typography size="body0" color="neutral-000" className="font-[100]">
          100
        </Typography>
        <Typography size="body0" color="neutral-000" className="font-[200]">
          200
        </Typography>
        <Typography size="body0" color="neutral-000" className="font-[300]">
          300
        </Typography>
        <Typography size="body0" color="neutral-000" className="font-[400]">
          400
        </Typography>
        <Typography size="body0" color="neutral-000" className="font-[500]">
          500
        </Typography>
        <Typography size="body0" color="neutral-000" className="font-[600]">
          weight-600
        </Typography>
        <Typography size="body0" color="neutral-000" className="font-[700]">
          weight-700
        </Typography>
        <Typography size="body0" color="neutral-000" className="font-[800]">
          800
        </Typography>
        <Typography size="body0" color="neutral-000" className="font-[900]">
          900
        </Typography>
      </div>
    </>
  )
}

export default TestDesign
