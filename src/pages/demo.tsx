import { useState } from 'react';

import { Button, Input } from '@/components/base';

const DemoPage = () => {
  // const [dropdowndemo, setDropdownDemo] = useState({ value: '', image: '' });
  const [inputdemo, setInputDemo] = useState('');
  // const myArray = [
  //   {
  //     title: 'Nguyen A',
  //     value: 'nguyen a',
  //     image:
  //       'https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no',
  //   },
  //   {
  //     title: 'Nguyen B',
  //     value: 'nguyen b',
  //     image:
  //       'https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no',
  //   },
  //   {
  //     title: 'Nguyen C',
  //     value: 'nguyen c',
  //     image:
  //       'https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no',
  //   },
  //   {
  //     title: 'Nguyen D',
  //     value: 'nguyen d',
  //     image:
  //       'https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no',
  //   },
  //   {
  //     title: 'Nguyen E',
  //     value: 'nguyen e',
  //     image:
  //       'https://lh3.googleusercontent.com/a/AAcHTtdb5ZItA3BDojhwftTd3N2UNjqyeIe5Fww1rX5ZWj4=s360-c-no',
  //   },
  // ];
  return (
    <div className="relative h-screen w-full bg-slate-300">
      <div className="absolute top-0 z-10 flex h-full w-full items-center justify-center">
        <div className="h-auto w-auto border-2 border-black p-3">
          <h2 className="font-medium">Components</h2>
          <div className="grid gap-2">
            <div className="h-10 w-40">
              <Button title="Button" />
            </div>
            <div className=" w-48">
              {/* <Dropdown
                option={myArray}
                title={dropdowndemo.value}
                image={dropdowndemo.image}
                onClick={(v, i) =>
                  setDropdownDemo({ value: v, image: i || '' })
                }
              /> */}
            </div>
            <div className="w-48">
              <Input
                title="Input"
                value={inputdemo}
                onChangeText={setInputDemo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
