from typing import List


class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        n = len(nums) / 3
        map = {}
        r = []

        for d in nums:
            if map.get(d) is None:
                map[d] = 0

            map[d] += 1

            if map[d] > n and map[d] <= n + 1:
                r.append(d)

        return r
