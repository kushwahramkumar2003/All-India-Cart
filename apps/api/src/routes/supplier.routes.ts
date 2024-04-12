import { Router } from 'express'
import { updateSupplierDetails } from '../controllers/supplier.controllers'

const router = Router()
router.put('/updateSupplier', updateSupplierDetails)
export default router
