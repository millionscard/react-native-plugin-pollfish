require "json"

pkg = JSON.parse(File.read("package.json"))

Pod::Spec.new do |s|
  s.name         = "react-native-plugin-pollfish"
  s.version      = pkg["version"]
  s.summary      = pkg["description"]
  s.homepage     = pkg["homepage"]
  s.license      = pkg["license"]
  s.authors      = pkg["author"]

  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/millionscard/react-native-plugin-pollfish.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"

  s.dependency "React"
  s.dependency "Pollfish", "6.2.5"

end
