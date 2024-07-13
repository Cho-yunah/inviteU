import { json } from 'micro'
import { NextApiRequest, NextApiResponse } from 'next'

export const parseJson = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function,
) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    req.body = await json(req)
  }
  next()
}
