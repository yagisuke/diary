import { mount } from '@vue/test-utils'
import Button from '@/components/atoms/button.vue'

describe('Button', () => {
  describe('プロパティ', () => {
    describe('type', () => {
      describe('デフォルト', () => {
        it('buttonクラスを持つbutton要素で構成されること1', () => {
          const button = mount(Button)
          expect(button.is('button')).to.equal(true)
          console.log('test', button.is('button'))
          expect(button.classes()).to.include('button')
        })
      })

      describe('button', () => {
        it('buttonクラスを持つbutton要素で構成されること2', () => {
          const button = mount(Button, {
            propsData: { type: 'button' }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('button')
        })
      })

      describe('text', () => {
        it('button-textクラスを持つbutton要素で構成されること', () => {
          const button = mount(Button, {
            propsData: { type: 'text' }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('button-text')
        })
      })

      describe('disabled', () => {
        describe('デフォルト', () => {
          it('disabled属性が付与されていないこと', () => {
            const button = mount(Button)
            expect(button.attributes().disabled).to.be.an('undefined')
          })
        })

        describe('true', () => {
          it('disabled属性が付与されていること', () => {
            const button = mount(Button, {
              propsData: { disabled: true }
            })
            expect(button.attributes().disabled).to.equal('disabled')
            // expect(button.attributes().disabled).to.equal(true)
          })
        })

        describe('true', () => {
          it('disabled属性が付与されていないこと', () => {
            const button = mount(Button, {
              propsData: { disabled: false }
            })
            expect(button.attributes().disabled).to.be.an('undefined')
          })
        })
      })
    })
  })

  describe('イベント', () => {
    describe('click', () => {
      it('発行されていること', () => {
        const button = mount(Button)
        button.trigger('click')
        expect(button.emitted().click.length).to.equal(1)
      })
    })
  })

  describe('slot', () => {
    describe('コンテンツ挿入あり', () => {
      it('挿入されていること', () => {
        const button = mount(Button, {
          slots: { default: '<p>hello</p>' }
        })
        expect(button.text()).to.equal('hello')
      })
    })

    describe('コンテンツ挿入なし', () => {
      it('挿入されていないこと', () => {
        const button = mount(Button)
        expect(button.text()).to.equal('')
      })
    })
  })
})
