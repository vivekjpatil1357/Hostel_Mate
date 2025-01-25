import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
// Mock user data
// const user = {
//   name: "Jane Doe",
//   email: "jane.doe@example.com",
//   hostelId: "H12345",
//   hostelIdNumber: "987654",
//   creationTime: new Date("2023-01-15T09:30:00"),
//   roomNumber: "B204",
//   photoUrl: "/placeholder.svg?height=100&width=100",
//   hostelIdPhotoUrl: "/placeholder.svg?height=200&width=300&text=Hostel+ID"
// }

export default function UserDashboard() {
  const [url, setUrl] = useState()
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    hostelId: "H12345",
    hostelIdNumber: "987654",
    creationTime: new Date("2023-01-15T09:30:00"),
    roomNumber: "B204",
    photoUrl: "/placeholder.svg?height=100&width=100",
    hostelIdPhotoUrl: "/placeholder.svg?height=200&width=300&text=Hostel+ID"
  }
  )
  const getImg = async () => {
    console.log("called");

    const url = await (await fetch('http://localhost:5000/getImageUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: user.hostelCardPhoto,
      }),
    })).json();
    console.log("done");

    setUrl(url.downloadUrl);
    console.log("this is url", url.downloadUrl);

  };
  useEffect(() => {
    const currUser = Cookies.get('user')
    const img = Cookies.get('img')
    try {
      if (currUser) {
        setUser(JSON.parse(currUser))
        console.log("user", currUser);

      }
      
    } catch (error) {
      console.log("error in parsing cookie data");
      
    }
    if(user)
    getImg()
  }, [])

  return (
    <div className="container mx-auto p-4  rounded-lg min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className=" shadow-lg">
          <CardHeader className="bg-gray-800 rounded-t-lg">
            <CardTitle className="text-white">User Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 mt-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20 border-2 border-gray-300">
                <AvatarImage src={user.photoUrl} alt={user.name} />
                <AvatarFallback className="bg-gray-300 text-gray-800">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Hostel ID:</span>
                <Badge variant="secondary" className="bg-gray-800 text-white hover:bg-gray-700">{user.hostelId}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Mobile Number:</span>
                <span className="text-gray-800">{user.mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Room Number:</span>
                <span className="text-gray-800">{user.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Account Created:</span>
                <span className="text-gray-800">{new Date(user.requestTime).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="bg-gray-800 rounded-t-lg">
            <CardTitle className="text-white">Hostel ID Photo</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-gray-300">
              <img
                src={url}
                alt="Hostel ID"
                className="object-contain w-full h-full"
              />
            </div>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Hostel ID: {user.hostelId}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

