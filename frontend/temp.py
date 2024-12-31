import heapq

def maxScore(nums1, nums2, k):
    nums = list(zip(nums1, nums2))
    nums.sort(key=lambda x: (-x[1]))
    total = 0
    res = 0
    heap = []
    for i in range(len(nums)):
        if len(heap) == k:
            total -= heapq.heappop(heap)
        total += nums[i][0]
        heapq.heappush(heap, nums[i][0])
        if len(heap) == k:
            res = max(res, total * nums[i][1])
    return res

print(maxScore([1, 3, 3, 2], [2, 1, 3, 4], 3))
