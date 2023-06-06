'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  function onFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return null
    }
    const previewUrl = URL.createObjectURL(files[0])
    setPreview(previewUrl)
  }
  return (
    <>
      <input
        type="file"
        name="coverUrl"
        id="media"
        className="invisible h-0 w-0"
        onChange={onFileSelect}
        accept="imagem/*"
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
