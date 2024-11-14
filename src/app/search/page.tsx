'use client'
import { SearchPage } from '@/components/SubComponents/SearchPage'
import { FormProviderSearchGarage } from '@/libs/forms/searchGarages'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
  return (
    <div>
      <FormProviderSearchGarage>
        <SearchPage />
      </FormProviderSearchGarage>
    </div>
  )
}