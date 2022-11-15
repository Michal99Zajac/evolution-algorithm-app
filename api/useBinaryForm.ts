import produce from 'immer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { API_URL } from '@/config/env'
import { defaultValues, BinaryForm as TBinaryForm } from '@/components/BinaryForm/form'

export const useBinaryForm = (setData: (data: any) => void) => {
  const { handleSubmit, ...form } = useForm<TBinaryForm>({
    defaultValues: defaultValues,
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit(async (rawData) => {
    setData(undefined)
    setIsLoading(true)

    // change values to float
    const data = produce(rawData, (draft) => {
      draft.crossover_config.probability = draft.crossover_config.probability / 100
      draft.inversion_config.probability = draft.inversion_config.probability / 100
      draft.selection_config.percentage = draft.selection_config.percentage / 100
      draft.mutation_config.probability = draft.mutation_config.probability / 100
      draft.elite_config.percentage = draft.elite_config.percentage / 100
    })

    try {
      const response = await axios.post(API_URL + '/api/bin', data)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  })

  return { ...form, onSubmit, isLoading }
}

export default useBinaryForm
