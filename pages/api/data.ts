import { NextApiRequest, NextApiResponse } from 'next';
import { Day } from '../../interfaces/Day.interface';
const data: Day[] = require('../../mock/data.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data);
}
