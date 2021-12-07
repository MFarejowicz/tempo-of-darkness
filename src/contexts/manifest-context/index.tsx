import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getManifest } from "../../utils/bungie-api";
import { UserContext } from "../user-context";

interface Manifest {
  // DestinyAchievementDefinition: { [x: number]: any };
  // DestinyActivityDefinition: { [x: number]: any };
  // DestinyActivityBundleDefinition: { [x: number]: any };
  // DestinyActivityGraphDefinition: { [x: number]: any };
  // DestinyActivityInteractableDefinition: { [x: number]: any };
  // DestinyActivityModeDefinition: { [x: number]: any };
  // DestinyActivityModifierDefinition: { [x: number]: any };
  // DestinyActivityTypeDefinition: { [x: number]: any };
  // DestinyArtDyeChannelDefinition: { [x: number]: any };
  // DestinyArtDyeReferenceDefinition: { [x: number]: any };
  // DestinyArtifactDefinition: { [x: number]: any };
  // DestinyBondDefinition: { [x: number]: any };
  // DestinyBreakerTypeDefinition: { [x: number]: any };
  // DestinyCharacterCustomizationCategoryDefinition: { [x: number]: any };
  // DestinyCharacterCustomizationOptionDefinition: { [x: number]: any };
  // DestinyChecklistDefinition: { [x: number]: any };
  DestinyClassDefinition: { [x: number]: any };
  // DestinyCollectibleDefinition: { [x: number]: any };
  // DestinyDamageTypeDefinition: { [x: number]: any };
  // DestinyDestinationDefinition: { [x: number]: any };
  // DestinyDirectorBookDefinition: { [x: number]: any };
  // DestinyEnemyRaceDefinition: { [x: number]: any };
  // DestinyEnergyTypeDefinition: { [x: number]: any };
  // DestinyEntitlementOfferDefinition: { [x: number]: any };
  // DestinyEquipmentSlotDefinition: { [x: number]: any };
  // DestinyFactionDefinition: { [x: number]: any };
  // DestinyGenderDefinition: { [x: number]: any };
  // DestinyGrimoireCardDefinition: { [x: number]: any };
  // DestinyHistoricalStatsDefinition: { [x: number]: any };
  // DestinyInventoryBucketDefinition: { [x: number]: any };
  DestinyInventoryItemDefinition: { [x: number]: any };
  // DestinyInventoryItemLiteDefinition: { [x: number]: any };
  // DestinyItemCategoryDefinition: { [x: number]: any };
  // DestinyItemTierTypeDefinition: { [x: number]: any };
  // DestinyLocationDefinition: { [x: number]: any };
  // DestinyLoreDefinition: { [x: number]: any };
  // DestinyMaterialRequirementSetDefinition: { [x: number]: any };
  // DestinyMedalTierDefinition: { [x: number]: any };
  // DestinyMetricDefinition: { [x: number]: any };
  // DestinyMilestoneDefinition: { [x: number]: any };
  // DestinyNodeStepSummaryDefinition: { [x: number]: any };
  // DestinyObjectiveDefinition: { [x: number]: any };
  // DestinyPlaceDefinition: { [x: number]: any };
  // DestinyPlatformBucketMappingDefinition: { [x: number]: any };
  // DestinyPlugSetDefinition: { [x: number]: any };
  // DestinyPowerCapDefinition: { [x: number]: any };
  // DestinyPresentationNodeDefinition: { [x: number]: any };
  // DestinyProgressionDefinition: { [x: number]: any };
  // DestinyProgressionLevelRequirementDefinition: { [x: number]: any };
  // DestinyProgressionMappingDefinition: { [x: number]: any };
  // DestinyRaceDefinition: { [x: number]: any };
  // DestinyRecordDefinition: { [x: number]: any };
  // DestinyReportReasonCategoryDefinition: { [x: number]: any };
  // DestinyRewardAdjusterPointerDefinition: { [x: number]: any };
  // DestinyRewardAdjusterProgressionMapDefinition: { [x: number]: any };
  // DestinyRewardItemListDefinition: { [x: number]: any };
  // DestinyRewardMappingDefinition: { [x: number]: any };
  // DestinyRewardSheetDefinition: { [x: number]: any };
  // DestinyRewardSourceDefinition: { [x: number]: any };
  // DestinySackRewardItemListDefinition: { [x: number]: any };
  // DestinySandboxPatternDefinition: { [x: number]: any };
  // DestinySandboxPerkDefinition: { [x: number]: any };
  // DestinyScriptedSkullDefinition: { [x: number]: any };
  // DestinySeasonDefinition: { [x: number]: any };
  // DestinySeasonPassDefinition: { [x: number]: any };
  // DestinySocketCategoryDefinition: { [x: number]: any };
  // DestinySocketTypeDefinition: { [x: number]: any };
  // DestinySpecialEventDefinition: { [x: number]: any };
  // DestinyStatDefinition: { [x: number]: any };
  // DestinyStatGroupDefinition: { [x: number]: any };
  // DestinyTalentGridDefinition: { [x: number]: any };
  // DestinyTraitCategoryDefinition: { [x: number]: any };
  // DestinyTraitDefinition: { [x: number]: any };
  // DestinyUnlockCountMappingDefinition: { [x: number]: any };
  // DestinyUnlockDefinition: { [x: number]: any };
  // DestinyUnlockEventDefinition: { [x: number]: any };
  // DestinyUnlockExpressionMappingDefinition: { [x: number]: any };
  // DestinyUnlockFlagDefinition: { [x: number]: any };
  // DestinyUnlockValueDefinition: { [x: number]: any };
  // DestinyVendorDefinition: { [x: number]: any };
  // DestinyVendorCategoryDefinition: { [x: number]: any };
  // DestinyVendorGroupDefinition: { [x: number]: any };
}

interface ManifestContextValue {
  manifest: Manifest | null;
}

const defaultManifestContextValue = {
  manifest: null,
};

export const ManifestContext = createContext<ManifestContextValue>(defaultManifestContextValue);

export const ManifestContextManager: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);
  const [manifest, setManifest] = useState<Manifest | null>(null);

  useEffect(() => {
    async function fetchManifest() {
      const fullManifest = await getManifest(user);
      // @ts-ignore
      const reducedManifest: Manifest = {};
      reducedManifest["DestinyClassDefinition"] = fullManifest.DestinyClassDefinition;
      reducedManifest["DestinyInventoryItemDefinition"] =
        fullManifest.DestinyInventoryItemDefinition;
      setManifest(reducedManifest);
    }

    if (user) {
      fetchManifest();
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      manifest,
    }),
    [manifest]
  );

  return <ManifestContext.Provider value={contextValue}>{children}</ManifestContext.Provider>;
};
