import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Button } from '../index'

describe('Button 按钮', () => {
  it('按钮可以被正确地挂载、更新和卸载', () => {
    const button = <Button>Mount</Button>
    expect(() => {
      const { rerender, unmount } = render(button)
      rerender(button)
      unmount()
    }).not.toThrow()
  })

  it('正确渲染', () => {
    const wrapper = render(<Button color="red">按钮</Button>)
    const button = wrapper.getByRole('button')
    expect(button.textContent).toBe('按钮')
    expect(button).toMatchInlineSnapshot(`
      <button
        class="m-1 py-2 px-4 font-semibold rounded-lg shadow-md text-white border-none cursor-pointer bg-red-500 hover:bg-red-700"
      >
        按钮
      </button>
    `)
  })
})
