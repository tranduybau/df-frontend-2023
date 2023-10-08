'use client'

import React, { memo, PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { X } from 'lucide-react'

import './ModalWrapper.css'
import AppButton, { ButtonVariant } from '../../AppButton'

interface ModalWrapperProps extends PropsWithChildren {
  isShowModal: boolean
  onCloseModal: () => void
}

function ModalWrapper(props: ModalWrapperProps) {
  const { children, isShowModal, onCloseModal } = props

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => {
      setMounted(false)
    }
  }, [])

  // Why can't use typeof window !== 'undefined'?
  if (mounted) {
    return createPortal(
      <div className={classNames('modal-container', isShowModal && 'active')}>
        <AppButton
          variant={ButtonVariant.TEXT}
          type="button"
          onClick={onCloseModal}
          className="modal-overlay cursor-auto"
        >
          <span />
        </AppButton>

        <div
          className={classNames(
            'relative max-w-[21.875rem] w-full p-[1rem] rounded-[0.5rem] bg-white border border-neutral-400 shadow-neutral-300',
            !isShowModal && 'hidden',
          )}
        >
          <AppButton
            variant={ButtonVariant.TEXT}
            type="button"
            onClick={onCloseModal}
            className="absolute top-[0.5rem] right-[0.5rem]"
          >
            <X className="text-red-600" />
          </AppButton>

          {children}
        </div>
      </div>,
      document.body,
    )
  }

  return null
}

export default memo(ModalWrapper)
