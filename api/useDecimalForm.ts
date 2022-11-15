import produce from 'immer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { addDoc, collection } from 'firebase/firestore'

import { API_URL } from '@/config/env'
import { defaultValues, DecimalForm as TDecimalForm } from '@/components/DecimalForm/form'
import { db } from '@/firebase'

export const useDecimalForm = (setData: (data: any) => void) => {
  const { handleSubmit, ...form } = useForm<TDecimalForm>({
    defaultValues: defaultValues,
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit(async (rawData) => {
    setData(undefined)
    setIsLoading(true)
    let response = null

    // change values to float
    const data = produce(rawData, (draft) => {
      draft.crossover_config.probability = draft.crossover_config.probability / 100
      draft.selection_config.percentage = draft.selection_config.percentage / 100
      draft.mutation_config.probability = draft.mutation_config.probability / 100
      draft.elite_config.percentage = draft.elite_config.percentage / 100
    })

    try {
      response = await axios.post(API_URL + '/api/decimal', data)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)

    if (!response) return

    // save to database
    await addDoc(collection(db, 'decimal'), {
      configuration: data,
      result: response.data,
    })
  })

  return { ...form, onSubmit, isLoading }
}

export default useDecimalForm
