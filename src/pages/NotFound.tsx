import { Link } from "react-router-dom";


function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f0f0] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="relative h-[200px] w-[200px] overflow-hidden rounded-full bg-[#e6e6e6] shadow-lg">
          <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 animate-bounce-spin">
            <div className="h-full w-full rounded-full bg-[#d1d1d1] p-4">
              <div className="h-full w-full rounded-full bg-[#c7c7c7] p-4">
                <div className="h-full w-full rounded-full bg-[#b2b2b2] p-4">
                  <div className="h-full w-full rounded-full bg-[#9d9d9d] p-4">
                    <div className="h-full w-full rounded-full bg-[#888888] p-4">
                      <div className="h-full w-full rounded-full bg-[#737373] p-4">
                        <div className="h-full w-full rounded-full bg-[#5e5e5e] p-4">
                          <div className="h-full w-full rounded-full bg-[#494949] p-4">
                            <div className="h-full w-full rounded-full bg-[#343434] p-4">
                              <div className="h-full w-full rounded-full bg-[#1f1f1f] p-4">
                                <div className="h-full w-full rounded-full bg-[#0a0a0a] p-4">
                                  <div className="h-full w-full rounded-full bg-[#000000] p-4">
                                    <div className="h-full w-full rounded-full bg-[#ffffff] p-4">
                                      <div className="h-full w-full rounded-full bg-[#f0f0f0] p-4">
                                        <div className="h-full w-full rounded-full bg-[#dbdbdb] p-4">
                                          <div className="h-full w-full rounded-full bg-[#c6c6c6] p-4">
                                            <div className="h-full w-full rounded-full bg-[#b1b1b1] p-4">
                                              <div className="h-full w-full rounded-full bg-[#9c9c9c] p-4">
                                                <div className="h-full w-full rounded-full bg-[#878787] p-4">
                                                  <div className="h-full w-full rounded-full bg-[#727272] p-4">
                                                    <div className="h-full w-full rounded-full bg-[#5d5d5d] p-4">
                                                      <div className="h-full w-full rounded-full bg-[#484848] p-4">
                                                        <div className="h-full w-full rounded-full bg-[#333333] p-4">
                                                          <div className="h-full w-full rounded-full bg-[#1e1e1e] p-4">
                                                            <div className="h-full w-full rounded-full bg-[#090909] p-4">
                                                              <div className="h-full w-full rounded-full bg-[#000000] text-[#f0f0f0] text-6xl font-bold">
                                                                404
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#333333] sm:text-4xl">
          Oops, something went wrong!
        </h1>
        <p className="mt-4 text-[#555555]">
          It looks like the key you're looking for is lost in the abyss. But
          don't worry, you can still explore our collection of mechanical
          keyboards and find the perfect one for your setup.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-[#333333] px-4 py-2 text-sm font-medium text-[#f0f0f0] shadow-sm transition-colors hover:bg-[#222222] focus:outline-none focus:ring-2 focus:ring-[#333333] focus:ring-offset-2"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;