import Image from "next/image";
export const CheckoutSummary = () => {
  return (
    <div className="bg-gray-100/50 dark:bg-gray-900 dark:text-white py-12 md:py-24">
      <div className="mx-auto max-w-lg px-4 lg:px-8">
        <div className="flex items-center">
          <span className="h-10 w-10 rounded-full bg-blue-900"></span>

          <h2 className="ml-4 font-medium">BambooYou</h2>
        </div>

        <div className="mt-8">
          <p className="text-2xl font-medium tracking-tight">$99.99</p>
          <p className="mt-1 text-sm text-gray-500">For the purchase of</p>
        </div>

        <div className="mt-12">
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              <li className="flex items-center justify-between py-4">
                <div className="flex items-start">
                  <Image
                    layout="responsive"
                    width={16}
                    height={9}
                    objectFit="contain"
                    alt="Trainer"
                    src="https://images.unsplash.com/photo-1565299999261-28ba859019bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                  />

                  <div className="ml-4">
                    <p className="text-sm">Vibrant Trainers</p>

                    <dl className="mt-1 space-y-1 text-xs text-gray-500">
                      <div>
                        <dt className="inline">Color:</dt>
                        <dd className="inline">Blue</dd>
                      </div>

                      <div>
                        <dt className="inline">Size:</dt>
                        <dd className="inline">UK 10</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div>
                  <p className="text-sm">
                    $49.99
                    <small className="text-gray-500">x1</small>
                  </p>
                </div>
              </li>

              <li className="flex items-center justify-between py-4">
                <div className="flex items-start">
                  <Image
                    layout="responsive"
                    width={16}
                    height={9}
                    objectFit="contain"
                    alt="Lettuce"
                    src="https://images.unsplash.com/photo-1640958904159-51ae08bd3412?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                  />

                  <div className="ml-4">
                    <p className="text-sm">Lettuce</p>

                    <dl className="mt-1 space-y-1 text-xs text-gray-500">
                      <div>
                        <dt className="inline">Size:</dt>
                        <dd className="inline">Big</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div>
                  <p className="text-sm">
                    $25
                    <small className="text-gray-500">x2</small>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
